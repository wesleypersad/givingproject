import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';
// import the getStripe function
import getStripe from '../lib/getStripe';

function PaymentActionForm({rowData, setRowData}) {
    // context provided variables
    const { FRONTEND_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    const [_id, setId] = useState(rowData._id);
    const [amount, setAmount] = useState(rowData.amount);
    const [charity, setCharity] = useState(rowData.charity);

    // define function to handle Stripe checkout
    async function handleCheckout() {
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
            {
                price: process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID,
                quantity: 1,
            },
            ],
            mode: 'payment',
            successUrl: `${FRONTEND_URL}/donate`,    //success
            cancelUrl: `${FRONTEND_URL}/cancel`,     //cancel
            customerEmail: 'vasudeo.persad@gmail.com',
        });
        console.warn(error.message);
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '1200px',
        height: 'auto',
        overflow: 'scroll'
    };

    return (
        <div className='action' style={myComponent}>
            <h1>Action Payment</h1>
            <form>
                <label>Modify Payment id = {_id}</label>
                <label>Amount :</label>
                <textarea
                    required 
                    value={ amount }
                    // onChange={(e) => setAmount(e.target.value)}
                    readOnly
                ></textarea>
                <label>Charity :</label>
                <textarea
                    required 
                    value={ charity }
                    // onChange={(e) => setCharity(e.target.value)}
                    readOnly
                ></textarea>
            </form>
            <div>
                <label>Go To Stripe Checkout To Make Payment</label>
                <button onClick={handleCheckout}>Action Payment</button>
            </div>
        </div>
    );
}

export default PaymentActionForm;