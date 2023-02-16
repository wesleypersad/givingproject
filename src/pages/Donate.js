import "../App.css";
import { Container } from 'react-bootstrap';
//import { useState } from "react";
import PaymentList from "../components/Paymentlist";
import PaymentForm from "../components/PaymentForm";
import SkillList from "../components/Skilllist";
import SkillForm from "../components/SkillForm";
import ItemList from "../components/Itemlist";
import ItemAddForm from "../components/ItemAddForm";
import useFetch from "../components/useFetch";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';

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

    // request the payment data
    const { data: payments, isPending, error } = useFetch(`${SERVER_URL}/payment/all`, options);

    // request skills data
    const { data: skills, isPending2, error2 } = useFetch(`${SERVER_URL}/skill/all`, options);

    // request item data
    const { data: items, isPending3, error3 } = useFetch(`${SERVER_URL}/item/all`, options);

    return (
        <div className="donate">
            <h1>Donations Page</h1>
            <Container>
                <h2>Payments</h2>
                {error && <div>{error} </div>}
                {isPending && <div>Loading ...</div>}
                {payments && <PaymentList payments={payments} title="Read/Create Payments" />}
            </Container>
            <Container>
                <PaymentForm />
            </Container>
            <Container>
                <h2>Skills</h2>
                {error2 && <div>{error2} </div>}
                {isPending2 && <div>Loading ...</div>}
                {skills && <SkillList skills={skills} title="Read/Create Skills" />}
            </Container>
            <Container>
                <SkillForm />
            </Container>
            <Container>
                <h2>Items</h2>
                {error3 && <div>{error3} </div>}
                {isPending3 && <div>Loading ...</div>}
                {items && <ItemList items={items} title="Read/Create Items" />}
            </Container>
            <Container>
                <ItemAddForm />
            </Container>
        </div>
    );
}

export default Donate;