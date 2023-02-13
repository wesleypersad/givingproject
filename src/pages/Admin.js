import "../App.css";
import { Container, Button } from 'react-bootstrap';
import { useState } from "react";
import useFetch from "../components/useFetch";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import Table from "../components/Table";

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
    const [userList, setUserList] = useState([{}]);
    const [blogList, setBlogList] = useState([{}]);
    const [eventList, setEventList] = useState([{}]);

    // request the user data
    const { data: users, isPending, error } = useFetch(`${SERVER_URL}/user`);
    const reqUser = () => { 
        setUserList(users);
        console.log(users);
    };

    // request the blog data
    const { data: blogs, isPending2, error2 } = useFetch(`${SERVER_URL}/blog/all`, options);
    const reqBlog = () => { 
        setBlogList(blogs);
        console.log(blogs);
    };

    // request the event data
    const { data: events, isPending3, error3 } = useFetch(`${SERVER_URL}/event/all`, options);
    const reqEvent = () => { 
        setEventList(events);
        console.log(events);
    };

    return (
        <div className="admin">
            <h1>Admin Page</h1>
            <Container>
                <Button onClick={reqUser} variant="primary">Get remote user JSON Data</Button>
                {userList && <Table tbodyData={userList}/>}                
            </Container>
            <Container>
                <Button onClick={reqBlog} variant="primary">Get remote blog JSON Data</Button>
                {blogList && <Table tbodyData={blogList}/>}
            </Container>
            <Container>
                <Button onClick={reqEvent} variant="primary">Get remote event JSON Data</Button>
                {eventList && <Table tbodyData={eventList}/>}
            </Container>
        </div>
    );
}

export default Admin;