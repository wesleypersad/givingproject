import "../App.css";
import { Container, Button, Card } from 'react-bootstrap';
import { useState } from "react";
import useFetch from "../components/useFetch";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';

function Admin() {
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

    // define the constants and functions to get the JSON data
    const [userList, setUserList] = useState("EMPTY USER LIST ...");
    const [blogList, setBlogList] = useState("EMPTY BLOG LIST ...");
    const [eventList, setEventList] = useState("EMPTY EVENT LIST ...");

    // request the user data
    const { data: users, isPending, error } = useFetch(`${SERVER_URL}/user`);
    const reqUser = () => { 
        setUserList(JSON.stringify(users));
        console.log(users);
    };

    // request the blog data
    const { data: blogs, isPending2, error2 } = useFetch(`${SERVER_URL}/blog/all`, options);
    const reqBlog = () => { 
        setBlogList(JSON.stringify(blogs));
        console.log(blogs);
    };

    // request the event data
    const { data: events, isPending3, error3 } = useFetch(`${SERVER_URL}/event/all`, options);
    const reqEvent = () => { 
        setEventList(JSON.stringify(events));
        console.log(events);
    };

    return (
        <div className="admin">
            <Container>
                <Card className="mb-3" style={{ color: "#000"}}>
                    <Card.Body>
                    <Card.Title>Users</Card.Title>
                    </Card.Body>
                    <Card.Text>
                        {userList}
                    </Card.Text>
                    <Button onClick={reqUser} variant="primary">Get remote user JSON Data</Button>
                </Card>
            </Container>
            <Container>
                <Card className="mb-3" style={{ color: "#000"}}>
                    <Card.Body>
                    <Card.Title>Blogs</Card.Title>
                    </Card.Body>
                    <Card.Text>
                        {blogList}
                    </Card.Text>
                    <Button onClick={reqBlog} variant="primary">Get remote blog JSON Data</Button>
                </Card>
            </Container>
            <Container>
                <Card className="mb-3" style={{ color: "#000"}}>
                    <Card.Body>
                    <Card.Title>Events</Card.Title>
                    </Card.Body>
                    <Card.Text>
                        {eventList}
                    </Card.Text>
                    <Button onClick={reqEvent} variant="primary">Get remote event JSON Data</Button>
                </Card>
            </Container>
        </div>
    );
}

export default Admin;