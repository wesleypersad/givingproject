import "../App.css";
import { Container, Button } from 'react-bootstrap';
import { useState, useEffect, useMemo } from "react";
import GetStore from "../functions/GetStore";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import Table from "../components/Table";
import ItemForm from "../components/ItemForm";
import SkillForm from "../components/SkillForm";
import ActionForm from "../components/ActionForm";
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

    //define the highligted row data, set highlighted row
    // for item
    const [highlightedRowItem, setHighlightedRowItem] = useState(-99);
    const [rowDataItem, setRowDataItem] = useState();
    // for skill
    const [highlightedRowSkill, setHighlightedRowSkill] = useState(-99);
    const [rowDataSkill, setRowDataSkill] = useState();
    // for payment
    const [highlightedRowPayment, setHighlightedRowPayment] = useState(-99);
    const [rowDataPayment, setRowDataPayment] = useState();

    // define state variables to toggle display of tables
    const [showPayment, setShowPayment] = useState(false);
    const [showSkill, setShowSkill] = useState(false); 
    const [showItem, setShowItem] = useState(false);

    // toggle display variables
    const togglePayment = () => {
        setShowPayment(!showPayment);
    };
    const toggleSkill = () => {
        setShowSkill(!showSkill);
    };
    const toggleItem = () => {
        setShowItem(!showItem);
    };

    // request the payment data
    const { data: payments, isPending: isPending4, error: error4 } = GetStore(`${SERVER_URL}/payment`, options, `${user.username}payments`);

    useEffect(() => {
        if (payments && !isPending4) {
            setPaymentList(payments);
            //console.log(payments);
            setHighlightedRowPayment(-99);
        };
    }, [payments, isPending4]);

    // request the skill data
    const { data: skills, isPending: isPending5, error: error5 } = GetStore(`${SERVER_URL}/skill/all`, options, 'skills');

    useEffect(() => {
        if (skills && !isPending5) {
            setSkillList(skills);
            //console.log(skills);
            setHighlightedRowSkill(-99);
        };
    }, [skills, isPending5]);


    // request the item data
    const { data: items, isPending: isPending6, error: error6 } = GetStore(`${SERVER_URL}/item/all`, options, 'items');

    useEffect(() => {
        if (items && !isPending6) {
            setItemList(items);
            //console.log(items);
            setHighlightedRowItem(-99);
        };
    }, [items, isPending6]);

    // when highlightedRow changes get the data
    // for item list
    useEffect(() => {
        if (highlightedRowItem >= 0) {
            setRowDataItem(itemList[highlightedRowItem]);
        } else {
            setRowDataItem();
        }
    }, [itemList, highlightedRowItem, isPending6]);
    // for skill list
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
                {isPending4 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error4 && <div>{error4}</div>}
                {!isPending4 && <Button onClick={togglePayment} variant="primary">Show Payment Data</Button>}
                {showPayment && <Table tbodyData={paymentList} highlightedRow={highlightedRowPayment} setHighlightedRow ={setHighlightedRowPayment}/>}
                {!rowDataPayment && <PaymentForm setPaymentList={setPaymentList} sesStoreName={`${user.username}payments`}/>}
                {rowDataPayment && <PaymentActionForm rowData={rowDataPayment} setRowData={setRowDataPayment} />}
            </Container>
            <Container>
                {isPending5 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error5 && <div>{error5}</div>}              
                {!isPending5 && <Button onClick={toggleSkill} variant="primary">Show Skill Data</Button>}
                {showSkill && <Table tbodyData={skillList} highlightedRow={highlightedRowSkill} setHighlightedRow ={setHighlightedRowSkill}/>}
                {!rowDataSkill && <SkillForm setSkillList={setSkillList} />}
                {rowDataSkill && <ActionForm rowData={rowDataSkill} isItem={ false } />}
            </Container>
            <Container>
                {isPending6 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error6 && <div>{error6}</div>}
                {!isPending6 && <Button onClick={toggleItem} variant="primary">Show Item Data</Button>}
                {showItem && <Table tbodyData={itemList} highlightedRow={highlightedRowItem} setHighlightedRow ={setHighlightedRowItem} />}           
                {!rowDataItem && <ItemForm setItemList={setItemList}/>}
                {rowDataItem && <ActionForm rowData={rowDataItem} isItem={ true } />}
            </Container>
        </div>
    );
}
export default Donate;