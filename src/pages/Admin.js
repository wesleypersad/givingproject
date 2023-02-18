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
import SkillAddForm from "../components/SkillAddForm";
import SkillEditForm from "../components/SkillEditForm";
import PaymentAddForm from "../components/PaymentAddForm";
import PaymentEditForm from "../components/PaymentEditForm";

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

    // when highlightedRow changes get the data
    // for item list
    useEffect(() => {
        if (highlightedRowItem >= 0) {
            setRowDataItem(itemList[highlightedRowItem]);
        } else {
            setRowDataItem();
        }
    }, [itemList, highlightedRowItem]);
    // for skilllist
    useEffect(() => {
        if (highlightedRowSkill >= 0) {
            setRowDataSkill(skillList[highlightedRowSkill]);
        } else {
            setRowDataSkill();
        }
    }, [skillList, highlightedRowSkill]);
    // for payment list
    useEffect(() => {
        if (highlightedRowPayment >= 0) {
            setRowDataPayment(paymentList[highlightedRowPayment]);
        } else {
            setRowDataPayment();
        }
    }, [paymentList, highlightedRowPayment]);

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
                {paymentList && <Table tbodyData={paymentList} highlightedRow={highlightedRowPayment} setHighlightedRow ={setHighlightedRowPayment}/>}
                {!rowDataPayment && <PaymentAddForm />}
                {rowDataPayment && <PaymentEditForm rowData={rowDataPayment} setRowData={setRowDataPayment} />}
            </Container>
            <Container>
                <Button onClick={reqSkill} variant="primary">Get skill JSON Data</Button>
                {skillList && <Table tbodyData={skillList} highlightedRow={highlightedRowSkill} setHighlightedRow ={setHighlightedRowSkill}/>}
                {!rowDataSkill && <SkillAddForm />}
                {rowDataSkill && <SkillEditForm rowData={rowDataSkill} setRowData={setRowDataSkill} />}
            </Container>
            <Container>
                <Button onClick={reqItem} variant="primary">Get item JSON Data</Button>
                {itemList && <Table tbodyData={itemList} highlightedRow={highlightedRowItem} setHighlightedRow ={setHighlightedRowItem} />}
                {!rowDataItem && <ItemAddForm />}
                {rowDataItem && <ItemEditForm rowData={rowDataItem} setRowData={setRowDataItem} />}
            </Container>
        </div>
    );
}

export default Admin;