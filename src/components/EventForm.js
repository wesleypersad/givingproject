import { useEffect, useState, useMemo } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import useSessionStorage from '../customHooks/useSessionStorage';
import '../App.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.css';

function EventForm({ rowData, setEventList, sesStoreName='events' }) {
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

    // use the session storage hook to store the user token
    const { deleteRecord, modifyRecord, addRecord } = useSessionStorage(sesStoreName);

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
        let event = { title, body, allDay, start, end };

        //modify request to type POST
        options.method = 'POST';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(event)
        };

        setIsPending(true);

        //add the event
        fetch(`${SERVER_URL}/event`, options)
        .then(response => response.json())
        .then(data => {
            console.log('new event added');
            setTitle('');
            setBody('');
            setAllDay(false);
            setStart('');
            setEnd('');
            setIsPending(false);
            //navigate('/donate');
            //window.location.reload();
            event = {...data};

            //add the item to the session storage and update the list
            const {recordData} = addRecord(event);
            setEventList(recordData);
        });
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
            //window.location.reload();
        });

        // modify the item from session storage and update the list
        const {recordData} = modifyRecord(thisevent);
        setEventList(recordData);
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
            //window.location.reload();
        });

        // delete the item from session storage and update the list
        const {recordData} = deleteRecord(_id);
        setEventList(recordData);
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
            <form className="p-3" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="text" placeholder="Add Title" style={{width:"20%", marginRight:"10pz"}}
                        className="form-control"
                        required 
                        id="floatingTextarea"
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="floatingTextarea">Title:</label>
                </div>
                <div className="form-floating mb-3">                  
                    <textarea
                        className="form-control"
                        id="floatingTextarea2"
                        required
                        value={ body }
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Body:</label>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <DatePicker 
                        placeholderText="Start Date" 
                        selected={start} onChange={(start) => setStart(start)}
                    />
                    <DatePicker 
                        placeholderText="End Date" 
                        selected={end} onChange={(end) => setEnd(end)}
                    /> 
                </div>
                <div className="d-flex justify-content-between">
                   {!isPending && 
                        (!isEmpty ? <button>Modify Event</button> : <button>Add Event</button>)
                    }
                    {isPending && 
                        (!isEmpty ? <button disabled>Modfying Event</button> : <button disabled>Adding Event</button>)
                    }
                    {!isEmpty && <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>} 
                </div>
{/*                 <div>
                    <textarea
                        className="form-control" 
                        value = {JSON.stringify(sendOps, null, 2)}
                    ></textarea>
                </div> */}
            </form>   
        </div>
    );
}

export default EventForm;