import "../App.css";
import { Container, Button } from 'react-bootstrap';
import { useState, useEffect, useMemo } from "react";
import useFetch2 from "../components/useFetch2";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import Table from "../components/Table";
import EventForm from "../components/EventForm";
import ItemForm from "../components/ItemForm";
import SkillForm from "../components/SkillForm";
import PaymentForm from "../components/PaymentForm";
import BlogForm from "../components/BlogForm";
import UserForm from "../components/UserForm";
import admin from '../images/admin.jpg';                // image by freepix

function Admin() {
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

    // define the constants and functions to get the JSON data
    const [userList, setUserList] = useState([{}]);
    const [blogList, setBlogList] = useState([{}]);
    const [eventList, setEventList] = useState([{}]);
    const [paymentList, setPaymentList] = useState([{}]);
    const [skillList, setSkillList] = useState([{}]);
    const [itemList, setItemList] = useState([{}]);

    //define the highligted row data
    // set highlighted row
    // for user
    const [highlightedRowUser, setHighlightedRowUser] = useState(-99);
    const [rowDataUser, setRowDataUser] = useState();
    // for blog
    const [highlightedRowBlog, setHighlightedRowBlog] = useState(-99);
    const [rowDataBlog, setRowDataBlog] = useState();
    // for event
    const [highlightedRowEvent, setHighlightedRowEvent] = useState(-99);
    const [rowDataEvent, setRowDataEvent] = useState();
    // for item
    const [highlightedRowItem, setHighlightedRowItem] = useState(-99);
    const [rowDataItem, setRowDataItem] = useState();
    // for skill
    const [highlightedRowSkill, setHighlightedRowSkill] = useState(-99);
    const [rowDataSkill, setRowDataSkill] = useState();
    // for payment
    const [highlightedRowPayment, setHighlightedRowPayment] = useState(-99);
    const [rowDataPayment, setRowDataPayment] = useState();

    // request the user data
    const { data: users, isPending, error } = useFetch2(`${SERVER_URL}/user/all`, options, 'users');
    const reqUser = () => {
        if (users.length && !isPending) {
            setUserList(users);
            //console.log(users);
        };
    };

    // request the blog data
    const { data: blogs, isPending2, error2 } = useFetch2(`${SERVER_URL}/blog/all`, options, 'blogs');
    const reqBlog = () => {
        if (blogs.length && !isPending2) {
            setBlogList(blogs);
            //console.log(blogs);
        };
    };

    // request the event data
    const { data: events, isPending3, error3 } = useFetch2(`${SERVER_URL}/event/all`, options, 'events');
    const reqEvent = () => {
        if (events.length && !isPending3) {
            setEventList(events);
            //console.log(events);
        };
    };

    // request the payment data
    const { data: payments, isPending4, error4 } = useFetch2(`${SERVER_URL}/payment/all`, options, 'payments');
    const reqPayment = () => { 
        if (payments.length && !isPending4) {
            setPaymentList(payments);
            //console.log(payments);
        };
    };

    // request the skill data
    const { data: skills, isPending5, error5 } = useFetch2(`${SERVER_URL}/skill/all`, options, 'skills');
    const reqSkill = () => { 
        if (skills.length && !isPending5) {
            setSkillList(skills);
            //console.log(skills);            
        };
    };

    // request the item data
    const { data: items, isPending6, error6 } = useFetch2(`${SERVER_URL}/item/all`, options, 'items');
    const reqItem = () => {
        if (items.length && !isPending6) {
            setItemList(items);
            //console.log(items);
        };
    };

    // when highlightedRow changes get the data
    // for user list
    useEffect(() => {    
        if (highlightedRowUser >= 0) {
            setRowDataUser(userList[highlightedRowUser]);
            console.log('userRow = ',rowDataUser);
        } else {
            setRowDataUser();
        };
    }, [userList, highlightedRowUser, rowDataUser]);
    // for blog list
    useEffect(() => {    
        if (highlightedRowBlog >= 0) {
            setRowDataBlog(blogList[highlightedRowBlog]);
            console.log('blogRow = ',rowDataBlog);
        } else {
            setRowDataBlog();
        };
    }, [blogList, highlightedRowBlog, rowDataBlog]);
    // for event list
    useEffect(() => {
        if (highlightedRowEvent >= 0) {
            setRowDataEvent(eventList[highlightedRowEvent]);
            console.log('eventRow = ',rowDataEvent);
        } else {
            setRowDataEvent();
        };
    }, [eventList, highlightedRowEvent, rowDataEvent]);
    // for item list
    useEffect(() => {
        if (highlightedRowItem >= 0) {
            setRowDataItem(itemList[highlightedRowItem]);
            console.log('itemRow = ',rowDataItem);
        } else {
            setRowDataItem();
        }
    }, [itemList, highlightedRowItem, rowDataItem]);
    // for skilllist
    useEffect(() => {
        if (highlightedRowSkill >= 0) {
            setRowDataSkill(skillList[highlightedRowSkill]);
            console.log('eventSkill = ',rowDataSkill);
        } else {
            setRowDataSkill();
        }
    }, [skillList, highlightedRowSkill, rowDataSkill]);
    // for payment list
    useEffect(() => {
        if (highlightedRowPayment >= 0) {
            setRowDataPayment(paymentList[highlightedRowPayment]);
        } else {
            setRowDataPayment();
        }
    }, [paymentList, highlightedRowPayment, rowDataPayment]);

    return (
        <div className="admin container square border border-info border-2" style={{backgroundImage:`url(${admin})`}} >
            <h1>Admin Page</h1>
            <Container>
                {!isPending && <Button onClick={reqUser} variant="primary">Show User Data</Button>}
                {isPending && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error && <div>{error}</div>}
                {userList && <Table tbodyData={userList} highlightedRow={highlightedRowUser} setHighlightedRow ={setHighlightedRowUser}/>}
                <UserForm rowData={rowDataUser} setUserList={setUserList} />
            </Container>
            <Container>
                {!isPending2 && <Button onClick={reqBlog} variant="primary">Show Blog Data</Button>}
                {isPending2 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error2 && <div>{error2}</div>}
                {blogList && <Table tbodyData={blogList} highlightedRow={highlightedRowBlog}  setHighlightedRow ={setHighlightedRowBlog}/>}
                <BlogForm rowData={rowDataBlog} setBlogList={setBlogList} />
            </Container>
            <Container>
                {!isPending3 && <Button onClick={reqEvent} variant="primary">Show Event Data</Button>}
                {isPending3 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error3 && <div>{error3}</div>}
                {eventList && <Table tbodyData={eventList} highlightedRow={highlightedRowEvent} setHighlightedRow ={setHighlightedRowEvent}/>}
                <EventForm rowData={rowDataEvent} setEventList={setEventList} />
            </Container>
            <Container>
                {!isPending4 && <Button onClick={reqPayment} variant="primary">Show Payment Data</Button>}
                {isPending4 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error4 && <div>{error4}</div>}
                {paymentList && <Table tbodyData={paymentList} highlightedRow={highlightedRowPayment} setHighlightedRow ={setHighlightedRowPayment}/>}
                <PaymentForm rowData={rowDataPayment} setPaymentList={setPaymentList} />
            </Container>
            <Container>
                {!isPending5 && <Button onClick={reqSkill} variant="primary">Show Skill Data</Button>}
                {isPending5 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error5 && <div>{error5}</div>}
                {skillList && <Table tbodyData={skillList} highlightedRow={highlightedRowSkill} setHighlightedRow ={setHighlightedRowSkill}/>}
                <SkillForm rowData={rowDataSkill} setSkillList={setSkillList} />
            </Container>
            <Container>
                {!isPending6 && <Button onClick={reqItem} variant="primary">Show Item Data</Button>}
                {isPending6 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error6 && <div>{error6}</div>}
                {itemList && <Table tbodyData={itemList} highlightedRow={highlightedRowItem} setHighlightedRow ={setHighlightedRowItem} />}
                <ItemForm rowData={rowDataItem} setItemList={setItemList} />
            </Container>
        </div>
    );
}

export default Admin;