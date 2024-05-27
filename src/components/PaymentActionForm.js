import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
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
        width: 'auto',
        height: 'auto',
        overflow: 'scroll'
    };

    return (
        <div className='action' style={myComponent}>
            <h1>Action Payment</h1>
            <form className="p-3">
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        id="floatingTextarea"
                        required 
                        value={ amount }
                        // onChange={(e) => setAmount(e.target.value)}
                        readOnly
                    ></textarea>
                    <label htmlFor="floatingTextarea">Amount:</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        id="floatingTextarea2"
                        required 
                        value={ charity }
                        // onChange={(e) => setCharity(e.target.value)}
                        readOnly
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Charity:</label>
                </div>                 
                <div  className="d-flex justify-content-between">
                    <button className="btn btn-info" onClick={handleCheckout}>Action Payment - Got To Stripe</button>
                </div>
            </form>            
        </div>
    );
}

export default PaymentActionForm;