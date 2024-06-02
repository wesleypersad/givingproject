import "../App.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useCallback } from "react";
import { Button, Card } from 'react-bootstrap';
import { useContext, useEffect, useMemo } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import useFetch2 from "../components/useFetch2";
import EventForm from "../components/EventForm";
import booking from '../images/booking.jpg';                // image by freepix

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

    // see if there is an authorized user
    const options = useMemo(() => {
        if (user) {
            return {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };
        };
        return {};
    }, [user]);

    // initialize state variables
    const [allEvents, setAllEvents] = useState([]);
    const [editEvent, setEditEvent] = useState();

    // get the list of events
    const { data: events, isPending2, error } = useFetch2(`${SERVER_URL}/event`, options, `${user.username}events`);
    const reqEvents = async () => {
        if (events && !isPending2 && !error) {
            setAllEvents(events);
        };
    };

    // return event selected from grid
    const handleSelectEvent = useCallback((event) => {
        //window.alert(event.title);
        if (editEvent === event) {
            // clear event first
            setEditEvent();
        } else {
            // set if cleared
            setEditEvent(event);
        };        
    },[editEvent]);

    // set the events state variable with results of fetch
    useEffect( () => {
        if (events) {
            setAllEvents(events);
        };
    }, [events]);

    return (
        <div className="booking container square border border-info border-2"  style={{backgroundImage:`url(${booking})`}} >
            <h1>Bookings Page</h1>
            <h2>Schedule Availability & Collections</h2>
            <Calendar localizer={localizer} events={allEvents} 
            startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}}  onSelectEvent={handleSelectEvent}
            />
            {error && <div>{error} </div>}
            {isPending2 && <div>Loading ...</div>}
            {events && <Card className="mb-3" style={{ color: "#000"}}>
                <Button  className='m-1' onClick={reqEvents} variant="primary">Get List Of Events</Button>
            </Card>}
            <EventForm rowData={editEvent} />
        </div>
    )
}

export default Booking;