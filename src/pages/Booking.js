import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Button, Card } from 'react-bootstrap';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import useFetch from "../components/useFetch";

const locales = {
    "en-GB": require("date-fns/locale/en-GB")
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

function Booking () {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    // see if there is an authorized user
    if (user) {
        options = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        };
    };

    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""});
    const [allEvents, setAllEvents] = useState([]);

    // add a new event to the list of events
    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    };

    // get the list of events
    const { data: events, isPending, error } = useFetch(`${SERVER_URL}/event`, options);
    const reqEvents = async () => {
        setAllEvents(events);
    };

    return (
        <div className="booking">
            <h1>Bookings</h1>
            <h2>Schedule Availability & Collections</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{width:"20%", marginRight:"10pz"}}
                value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <DatePicker 
                    placeholderText="Start Date" style={{marginRight:"10px"}}
                    selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}
                />
                <DatePicker 
                    placeholderText="End Date" 
                    selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}
                />
                <button style={{marginTop:"10px"}} onClick={handleAddEvent}>Add Event</button>
            </div>
            <Calendar localizer={localizer} events={allEvents} 
            startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}} />
            {error && <div>{error} </div>}
            {isPending && <div>Loading ...</div>}
            {events && <Card className="mb-3" style={{ color: "#000"}}>
                <Card.Body>
                <Card.Title>List Of Events</Card.Title>
                </Card.Body>                
                <Button  className='m-1' onClick={reqEvents} variant="primary">Get list of events JSON Data</Button>
            </Card>}
        </div>
    )
}

export default Booking;