import "../App.css";
import { Container, Button } from 'react-bootstrap';
import { useState, useEffect, useMemo } from "react";
import useFetch from "../components/useFetch";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import Table from "../components/Table";
//import ItemAddForm from "../components/ItemAddForm";
import ItemActionForm from "../components/ItemActionForm";
import ItemForm from "../components/ItemForm";
//import SkillAddForm from "../components/SkillAddForm";
import SkillForm from "../components/SkillForm";
import SkillActionForm from "../components/SkillActionForm";
//import PaymentAddForm from "../components/PaymentAddForm";
import PaymentForm from "../components/PaymentForm";
import PaymentActionForm from "../components/PaymentActionForm";
import donate from '../images/donate.jpg';                // image by freepix

function Donate() {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    // see if there is an authorized user and useMemo to set the options
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
    const { data: payments, isPending4, error4 } = useFetch(`${SERVER_URL}/payment`, options);
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
        <div className="donate container square border border-info border-2" style={{backgroundImage:`url(${donate})`}} >
            <h1>Donations Page</h1>
            <Container>
                {!isPending4 && <Button onClick={reqPayment} variant="primary">Show Payment Data</Button>}
                {isPending4 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error4 && <div>{error4}</div>}
                {paymentList && <Table tbodyData={paymentList} highlightedRow={highlightedRowPayment} setHighlightedRow ={setHighlightedRowPayment}/>}
                {/* {!rowDataPayment && <PaymentAddForm />} */}
                {!rowDataPayment && <PaymentForm />}
                {rowDataPayment && <PaymentActionForm rowData={rowDataPayment} setRowData={setRowDataPayment} />}
            </Container>
            <Container>
                {!isPending5 && <Button onClick={reqSkill} variant="primary">Show Skill Data</Button>}
                {isPending5 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error5 && <div>{error5}</div>}              
                {skillList && <Table tbodyData={skillList} highlightedRow={highlightedRowSkill} setHighlightedRow ={setHighlightedRowSkill}/>}
                {/* {!rowDataSkill && <SkillAddForm />} */}
                {!rowDataSkill && <SkillForm />}
                {rowDataSkill && <SkillActionForm rowData={rowDataSkill} setRowData={setRowDataSkill} />}
            </Container>
            <Container>
                {!isPending6 && <Button onClick={reqItem} variant="primary">Show Item Data</Button>}
                {isPending6 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error6 && <div>{error6}</div>}
                {itemList && <Table tbodyData={itemList} highlightedRow={highlightedRowItem} setHighlightedRow ={setHighlightedRowItem} />}
                {/* {!rowDataItem && <ItemAddForm />} */}
                {!rowDataItem && <ItemForm />}
                {rowDataItem && <ItemActionForm rowData={rowDataItem} setRowData={setRowDataItem} />}
            </Container>
        </div>
    );
}
export default Donate;