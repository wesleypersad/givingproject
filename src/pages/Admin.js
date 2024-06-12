import "../App.css";
import { Container, Button } from 'react-bootstrap';
import { useContext, useState, useEffect, useMemo } from "react";
import GetStore from "../functions/GetStore";
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

    // state variables for display of tables
    const [showUser, setShowUser] = useState(false);
    const [showBlog, setShowBlog] = useState(false);
    const [showEvent, setShowEvent] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [showSkill, setShowSkill] = useState(false);
    const [showItem, setShowItem] = useState(false);

    //toggle the display of the tables
    const toggleUser = () => {
        setShowUser(!showUser);
    };
    const toggleBlog = () => {
        setShowBlog(!showBlog);
    };
    const toggleEvent = () => {
        setShowEvent(!showEvent);
    };
    const togglePayment = () => {
        setShowPayment(!showPayment);
    };
    const toggleSkill = () => {
        setShowSkill(!showSkill);
    };
    const toggleItem = () => {
        setShowItem(!showItem);
    };

    // request the user data
    const { data: users, isPending, error } = GetStore(`${SERVER_URL}/user/all`, options, 'users');

    useEffect(() => {
        if (users && !isPending) {
            setUserList(users);
            //console.log(users);
            setHighlightedRowUser(-99);
        };
    }, [users, isPending, error]);

    // request the blog data
    const { data: blogs, isPending: isPending2, error: error2 } = GetStore(`${SERVER_URL}/blog/all`, options, 'blogs');

    useEffect(() => {
        if (blogs && !isPending2) {
            setBlogList(blogs);
            //console.log(blogs);
            setHighlightedRowBlog(-99);
        };
    }, [blogs, isPending2, error2]);

    // request the event data
    const { data: events, isPending: isPending3, error: error3 } = GetStore(`${SERVER_URL}/event/all`, options, 'events');

    useEffect(() => {
        if (events && !isPending3) {
            setEventList(events);
            //console.log(events);
            setHighlightedRowEvent(-99);
        };
    }, [events, isPending3, error3]);


    // request the payment data
    const { data: payments, isPending: isPending4, error: error4 } = GetStore(`${SERVER_URL}/payment/all`, options, 'payments');

    useEffect(() => {
        if (payments && !isPending4) {
            setPaymentList(payments);
            //console.log(payments);
            setHighlightedRowPayment(-99);
        };
    }, [payments, isPending4, error4]);

    // request the skill data
    const { data: skills, isPending: isPending5, error: error5 } = GetStore(`${SERVER_URL}/skill/all`, options, 'skills');

    useEffect(() => {
        if (skills && !isPending5) {
            setSkillList(skills);
            //console.log(skills);
            setHighlightedRowSkill(-99);
        };
    }, [skills, isPending5, error5]);

    // request the item data
    const { data: items, isPending: isPending6, error: error6 } = GetStore(`${SERVER_URL}/item/all`, options, 'items');

    useEffect(() => {
        if (items && !isPending6) {
            setItemList(items);
            //console.log(items);
            setHighlightedRowItem(-99);
        };
    }, [items, isPending6, error6]);

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
                {!isPending && <Button onClick={toggleUser} variant="primary">Show User Data</Button>}
                {isPending && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error && <div>{error}</div>}
                {showUser && <Table tbodyData={userList} highlightedRow={highlightedRowUser} setHighlightedRow ={setHighlightedRowUser}/>}
                <UserForm rowData={rowDataUser} setUserList={setUserList} />
            </Container>
            <Container>
                {!isPending2 && <Button onClick={toggleBlog} variant="primary">Show Blog Data</Button>}
                {isPending2 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error2 && <div>{error2}</div>}
                {showBlog && <Table tbodyData={blogList} highlightedRow={highlightedRowBlog}  setHighlightedRow ={setHighlightedRowBlog}/>}
                <BlogForm rowData={rowDataBlog} setBlogList={setBlogList} />
            </Container>
            <Container>
                {!isPending3 && <Button onClick={toggleEvent} variant="primary">Show Event Data</Button>}
                {isPending3 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error3 && <div>{error3}</div>}
                {showEvent && <Table tbodyData={eventList} highlightedRow={highlightedRowEvent} setHighlightedRow ={setHighlightedRowEvent}/>}
                <EventForm rowData={rowDataEvent} setEventList={setEventList} />
            </Container>
            <Container>
                {!isPending4 && <Button onClick={togglePayment} variant="primary">Show Payment Data</Button>}
                {isPending4 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error4 && <div>{error4}</div>}
                {showPayment && <Table tbodyData={paymentList} highlightedRow={highlightedRowPayment} setHighlightedRow ={setHighlightedRowPayment}/>}
                <PaymentForm rowData={rowDataPayment} setPaymentList={setPaymentList} />
            </Container>
            <Container>
                {!isPending5 && <Button onClick={toggleSkill} variant="primary">Show Skill Data</Button>}
                {isPending5 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error5 && <div>{error5}</div>}
                {showSkill && <Table tbodyData={skillList} highlightedRow={highlightedRowSkill} setHighlightedRow ={setHighlightedRowSkill}/>}
                <SkillForm rowData={rowDataSkill} setSkillList={setSkillList} />
            </Container>
            <Container>
                {!isPending6 && <Button onClick={toggleItem} variant="primary">Show Item Data</Button>}
                {isPending6 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error6 && <div>{error6}</div>}
                {showItem && <Table tbodyData={itemList} highlightedRow={highlightedRowItem} setHighlightedRow ={setHighlightedRowItem} />}
                <ItemForm rowData={rowDataItem} setItemList={setItemList} />
            </Container>
        </div>
    );
}

export default Admin;