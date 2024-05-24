import { useEffect, useState, useMemo } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function EventForm({ rowData }) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    //test for rowData cotaining anything useful
    const isEmpty = rowData === null || rowData === undefined || Object.keys(rowData).length === 0;

    //initialise state variables
    const [_id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [allDay, setAllDay] = useState(false);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [isPending, setIsPending]= useState(false);

    // if there is an authorized user
    let options = useMemo(() => {
        if (user) {
            return {
                //method: method,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    // definately needed for body to be passed in fetch
                    'Content-type' : 'application/json'
                }
            };
        };
        return {};
    }, [user]);

    // see if the rowData or empty status has changed
    useEffect(() => {
        if (!isEmpty) {
            setId(rowData._id);
            setTitle(rowData.title);
            setBody(rowData.body);
            setAllDay(rowData.allDay);
            setStart(new Date(rowData.start));
            setEnd(new Date(rowData.end));            
        } else {
            setId('');
            setTitle('');
            setBody('');
            setAllDay(false);
            setStart('');
            setEnd('');
        }
    },[rowData, isEmpty]);

    // handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEmpty) {
            handleModify(e);
        } else {
            handleCreate(e);
        }
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const event = { _id, title, body, allDay, start, end };


        //modify request to type POST
        options.method = 'POST';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(event)
        };

        setIsPending(true);

        //add the event
        fetch(`${SERVER_URL}/user`, options)
        .then(() => {
            console.log('new event added');
            setTitle('');
            setBody('');
            setAllDay(false);
            setStart('');
            setEnd('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };
    const handleModify = (e) => {
        e.preventDefault();
        const thisevent = { _id, title, body, allDay, start, end};

        //modify request to type PUT
        options.method = 'PUT';
        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(thisevent)
        };

        setIsPending(true);

        //modify the event
        fetch(`${SERVER_URL}/event`, options)
        .then(() => {
            console.log('event modified');
            setTitle('');
            setBody('');
            setAllDay(false);
            setStart('');
            setEnd('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };

    const handleDelete = (e) => {
        // problem with useFetch hook so ordinary fetch used ?
        const thisevent = {_id};

        //modify request to type DELETE
        options.method = 'DELETE';

        options = { ...options,
            body: JSON.stringify(thisevent)
        };

        //delete the event
        fetch(`${SERVER_URL}/event`, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .then(() => {
            console.log('event deleted');
            setTitle('');
            setBody('');
            setAllDay(false);
            setStart('');
            setEnd('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: 'auto',
        height: 'auto',
        overflow: 'scroll'
    };

    return (
        <div className='create' style={myComponent}>
            {!isEmpty ? <h1>Modify Event</h1> : <h1>Add An Event</h1>}
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" placeholder="Add Title" style={{width:"20%", marginRight:"10pz"}}
                    value={title} onChange={(e) => setTitle(e.target.value)}
                />
                <label>Body:</label>
                <textarea
                    className="form-control"
                    required
                    value={ body }
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <DatePicker 
                    placeholderText="Start Date" style={{marginRight:"10px"}}
                    selected={start} onChange={(start) => setStart(start)}
                />
                <DatePicker 
                    placeholderText="End Date" 
                    selected={end} onChange={(end) => setEnd(end)}
                />
                {!isPending && 
                    (!isEmpty ? <button>Modify Event</button> : <button>Add Event</button>)
                }
                {isPending && 
                    (!isEmpty ? <button disabled>Modfying Event</button> : <button disabled>Adding Event</button>)
                }
            </form>
            {!isEmpty && <button onClick={() => handleDelete()}>Delete</button>}
        </div>
    );
}

export default EventForm;