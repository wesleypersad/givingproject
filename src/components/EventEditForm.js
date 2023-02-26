import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function EventEditForm({rowData, setRowData}) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    const [_id, setId] = useState(rowData._id);
    const [title, setTitle] = useState(rowData.title);
    const [body, setBody] = useState(rowData.body);
    const [allDay, setAllDay] = useState(rowData.allDay);
    //problem with the stat and end ?
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [isPending, setIsPending]= useState(false);

    // if there is an authorized user set the fetch options
    if (user) {
        options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                // definately needed for body to be passed in fetch
                'Content-type' : 'application/json'
            }
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const event = { _id, title, body, allDay, start, end };
        //console.log(JSON.stringify(event));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(event)
        };

        setIsPending(true);

        fetch(`${SERVER_URL}/event`, options)
        .then(() => {
            console.log('new event added');
            setTitle('');
            setBody('');
            setAllDay(false);
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '1200px',
        height: '200px',
        overflow: 'scroll'
    };

    return (
        <div className='create' style={myComponent}>
            <h1>Modify An Event</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Add Title" style={{width:"20%", marginRight:"10pz"}}
                value={title} onChange={(e) => setTitle(e.target.value)}
                />
                <input type="text" placeholder="Add Body" style={{width:"20%", marginRight:"10pz"}}
                value={body} onChange={(e) => setBody(e.target.value)}
                />
                <DatePicker 
                    placeholderText="Start Date" style={{marginRight:"10px"}}
                    selected={start} onChange={(start) => setStart(start)}
                />
                <DatePicker 
                    placeholderText="End Date" 
                    selected={end} onChange={(end) => setEnd(end)}
                />
                {!isPending && <button>Modify Event</button>}
                {isPending && <button disabled>Modifying Event</button>}
            </form>
        </div>
    );
}

export default EventEditForm;