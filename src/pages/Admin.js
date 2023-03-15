import "../App.css";
import { Container, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import useFetch from "../components/useFetch";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import Table from "../components/Table";
import EventAddForm from "../components/EventAddForm";
import EventEditForm from "../components/EventEditForm";
import ItemAddForm from "../components/ItemAddForm";
import ItemEditForm from "../components/ItemEditForm";
import SkillAddForm from "../components/SkillAddForm";
import SkillEditForm from "../components/SkillEditForm";
import PaymentAddForm from "../components/PaymentAddForm";
import PaymentEditForm from "../components/PaymentEditForm";
import BlogAddForm from "../components/BlogAddForm";
import BlogEditForm from "../components/BlogEditForm";
import UserAddForm from "../components/UserAddForm";
import UserEditForm from "../components/UserEditForm";
import admin from '../images/admin.jpg';                // image by freepix

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
    const { data: users, isPending, error } = useFetch(`${SERVER_URL}/user/all`, options);
    const reqUser = () => {
        if (users.length && !isPending) {
            setUserList(users);
            console.log(users);
        };
    };

    // request the blog data
    const { data: blogs, isPending2, error2 } = useFetch(`${SERVER_URL}/blog/all`, options);
    const reqBlog = () => {
        if (blogs.length && !isPending2) {
            setBlogList(blogs);
            console.log(blogs);
        };
    };

    // request the event data
    const { data: events, isPending3, error3 } = useFetch(`${SERVER_URL}/event/all`, options);
    const reqEvent = () => {
        if (events.length && !isPending3) {
            setEventList(events);
            console.log(events);
        };
    };

    // request the payment data
    const { data: payments, isPending4, error4 } = useFetch(`${SERVER_URL}/payment/all`, options);
    const reqPayment = () => { 
        if (payments.length && !isPending4) {
            setPaymentList(payments);
            console.log(payments);
        };
    };

    // request the skill data
    const { data: skills, isPending5, error5 } = useFetch(`${SERVER_URL}/skill/all`, options);
    const reqSkill = () => { 
        if (skills.length && !isPending5) {
            setSkillList(skills);
            console.log(skills);            
        };
    };

    // request the item data
    const { data: items, isPending6, error6 } = useFetch(`${SERVER_URL}/item/all`, options);
    const reqItem = () => {
        if (items.length && !isPending6) {
            setItemList(items);
            console.log(items);
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
                <Button onClick={reqUser} variant="primary">Get User Data</Button>
                {userList && <Table tbodyData={userList} highlightedRow={highlightedRowUser} setHighlightedRow ={setHighlightedRowUser}/>}
                {!rowDataUser && <UserAddForm />}
                {rowDataUser && <UserEditForm rowData={rowDataUser} setRowData={setRowDataUser} />}            
            </Container>
            <Container>
                <Button onClick={reqBlog} variant="primary">Get Blog Data</Button>
                {blogList && <Table tbodyData={blogList} highlightedRow={highlightedRowBlog}  setHighlightedRow ={setHighlightedRowBlog}/>}
                {!rowDataBlog && <BlogAddForm />}
                {rowDataBlog && <BlogEditForm rowData={rowDataBlog} setRowData={setRowDataBlog} />}
            </Container>
            <Container>
                <Button onClick={reqEvent} variant="primary">Get Event Data</Button>
                {eventList && <Table tbodyData={eventList} highlightedRow={highlightedRowEvent} setHighlightedRow ={setHighlightedRowEvent}/>}
                {!rowDataEvent && <EventAddForm />}
                {rowDataEvent && <EventEditForm rowData={rowDataEvent} setRowData={setRowDataEvent} />}
            </Container>
            <Container>
                <Button onClick={reqPayment} variant="primary">Get Payment Data</Button>
                {paymentList && <Table tbodyData={paymentList} highlightedRow={highlightedRowPayment} setHighlightedRow ={setHighlightedRowPayment}/>}
                {!rowDataPayment && <PaymentAddForm />}
                {rowDataPayment && <PaymentEditForm rowData={rowDataPayment} setRowData={setRowDataPayment} />}
            </Container>
            <Container>
                <Button onClick={reqSkill} variant="primary">Get Skill Data</Button>
                {skillList && <Table tbodyData={skillList} highlightedRow={highlightedRowSkill} setHighlightedRow ={setHighlightedRowSkill}/>}
                {!rowDataSkill && <SkillAddForm />}
                {rowDataSkill && <SkillEditForm rowData={rowDataSkill} setRowData={setRowDataSkill} />}
            </Container>
            <Container>
                <Button onClick={reqItem} variant="primary">Get Item Data</Button>
                {itemList && <Table tbodyData={itemList} highlightedRow={highlightedRowItem} setHighlightedRow ={setHighlightedRowItem} />}
                {!rowDataItem && <ItemAddForm />}
                {rowDataItem && <ItemEditForm rowData={rowDataItem} setRowData={setRowDataItem} />}
            </Container>
        </div>
    );
}

export default Admin;