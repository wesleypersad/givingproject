import "../App.css";
import { Container, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import useFetch from "../components/useFetch";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import Table from "../components/Table";
import ItemAddForm from "../components/ItemAddForm";
import ItemActionForm from "../components/ItemActionForm";
import SkillAddForm from "../components/SkillAddForm";
import SkillActionForm from "../components/SkillActionForm";
import PaymentAddForm from "../components/PaymentAddForm";
import PaymentActionForm from "../components/PaymentActionForm";

function Donate() {
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
    }, [itemList, highlightedRowItem, isPending6]);
    // for skilllist
    useEffect(() => {
        if (highlightedRowSkill >= 0) {
            setRowDataSkill(skillList[highlightedRowSkill]);
        } else {
            setRowDataSkill();
        }
    }, [skillList, highlightedRowSkill, isPending5]);
    // for payment list
    useEffect(() => {
        if (highlightedRowPayment >= 0) {
            setRowDataPayment(paymentList[highlightedRowPayment]);
        } else {
            setRowDataPayment();
        }
    }, [paymentList, highlightedRowPayment, isPending4]);

    return (
        <div className="admin">
            <h1>Donations Page</h1>
            <Container>
                <Button onClick={reqPayment} variant="primary">Get payment JSON Data</Button>
                {paymentList && <Table tbodyData={paymentList} highlightedRow={highlightedRowPayment} setHighlightedRow ={setHighlightedRowPayment}/>}
                {!rowDataPayment && <PaymentAddForm />}
                {rowDataPayment && <PaymentActionForm rowData={rowDataPayment} setRowData={setRowDataPayment} />}
            </Container>
            <Container>
                <Button onClick={reqSkill} variant="primary">Get skill JSON Data</Button>
                {skillList && <Table tbodyData={skillList} highlightedRow={highlightedRowSkill} setHighlightedRow ={setHighlightedRowSkill}/>}
                {!rowDataSkill && <SkillAddForm />}
                {rowDataSkill && <SkillActionForm rowData={rowDataSkill} setRowData={setRowDataSkill} />}
            </Container>
            <Container>
                <Button onClick={reqItem} variant="primary">Get item JSON Data</Button>
                {itemList && <Table tbodyData={itemList} highlightedRow={highlightedRowItem} setHighlightedRow ={setHighlightedRowItem} />}
                {!rowDataItem && <ItemAddForm />}
                {rowDataItem && <ItemActionForm rowData={rowDataItem} setRowData={setRowDataItem} />}
            </Container>
        </div>
    );
}
export default Donate;