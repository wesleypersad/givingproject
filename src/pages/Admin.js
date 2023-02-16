import "../App.css";
import { Container, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import useFetch from "../components/useFetch";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import Table from "../components/Table";
import ItemAddForm from "../components/ItemAddForm";
import ItemEditForm from "../components/ItemEditForm";

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
    const [paymentList, setPaymentList] = useState([{}]);
    const [skillList, setSkillList] = useState([{}]);
    const [itemList, setItemList] = useState([{}]);

    //define the highligted row data
    // set highlighted row
    const [highlightedRow, setHighlightedRow] = useState(-99);
    const [rowData, setRowData] = useState();

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

    // request the payment data
    const { data: payments, isPending4, error4 } = useFetch(`${SERVER_URL}/payment/all`, options);
    const reqPayment = () => { 
        setPaymentList(payments);
        console.log(payments);
    };

    // request the skill data
    const { data: skills, isPending5, error5 } = useFetch(`${SERVER_URL}/skill/all`, options);
    const reqSkill = () => { 
        setSkillList(skills);
        console.log(skills);
    };

    // request the item data
    const { data: items, isPending6, error6 } = useFetch(`${SERVER_URL}/item/all`, options);
    const reqItem = () => { 
        setItemList(items);
        console.log(items);
    };

    // when highligtedRow changes get the data
    useEffect(() => {
        if (highlightedRow >= 0) {
            setRowData(itemList[highlightedRow]);
        } else {
            setRowData();
        }
    }, [itemList, highlightedRow]);

    return (
        <div className="admin">
            <h1>Admin Page</h1>
            <Container>
                <Button onClick={reqUser} variant="primary">Get user JSON Data</Button>
                {userList && <Table tbodyData={userList}/>}                
            </Container>
            <Container>
                <Button onClick={reqBlog} variant="primary">Get blog JSON Data</Button>
                {blogList && <Table tbodyData={blogList}/>}
            </Container>
            <Container>
                <Button onClick={reqEvent} variant="primary">Get event JSON Data</Button>
                {eventList && <Table tbodyData={eventList}/>}
            </Container>
            <Container>
                <Button onClick={reqPayment} variant="primary">Get payment JSON Data</Button>
                {paymentList && <Table tbodyData={paymentList}/>}
            </Container>
            <Container>
                <Button onClick={reqSkill} variant="primary">Get skill JSON Data</Button>
                {skillList && <Table tbodyData={skillList}/>}
            </Container>
            <Container>
                <Button onClick={reqItem} variant="primary">Get item JSON Data</Button>
                {itemList && <Table tbodyData={itemList} highlightedRow={highlightedRow} setHighlightedRow ={setHighlightedRow} />}
                {!rowData && <ItemAddForm />}
                {rowData && <ItemEditForm rowData={rowData} setRowData={setRowData} />}
            </Container>
        </div>
    );
}

export default Admin;