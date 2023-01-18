import '../App.css';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { useState } from "react";
import { useContext } from "react";
import useFetch from "../components/useFetch";
import DataContext from "../context/DataContext";

function Research () {
    // from  the data context
    const { DB_URL, CHARITY_URL } = useContext(DataContext);

    // define the constants and functions to get the JSON data
    const [userList, setUserList] = useState("EMPTY USERS...");
    const [eventList, setEventList] = useState("EMPTY EVENTS...");
    const [charityList, setCharityList] = useState("EMPTY CHARITIES...");

    const API_URL = process.env.REACT_APP_API_URL;

    // get the users (from local JSON server)
    const { data: users, isPending, error } = useFetch(`${DB_URL}/users`);
    const reqUsers = () => {
        setUserList(JSON.stringify(users));
    };

    // get the event (from remote JSON server)
    const { data: events, isPending3, error3 } = useFetch(`${API_URL}/evnts`);
    const reqEvents = () => {
        setEventList(JSON.stringify(events));
        console.log(events);
    };

    // request the charities data
    const { data: charities, isPending4, error4 } = useFetch(`${CHARITY_URL}`);
    const reqCharity = () => { 
        setCharityList(JSON.stringify(charities));
        console.log(charities);
    };

    return (
        <div className="research">
            <Container>
                <Card className="mb-3" style={{ color: "#000"}}>
                    <Card.Body>
                    <Card.Title>Charities</Card.Title>
                    </Card.Body>
                    <Card.Text>
                        {charityList}
                    </Card.Text>
                    <Button onClick={reqCharity} variant="primary">Get remote charity JSON Data</Button>
                </Card>
            </Container>
        </div>
    );
}

export default Research;