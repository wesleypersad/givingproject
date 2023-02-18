import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function PaymentActionForm({rowData, setRowData}) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    console.log('ACTION FORM=', rowData);

    const [_id, setId] = useState(rowData._id);
    const [amount, setAmount] = useState(rowData.amount);
    const [charity, setCharity] = useState(rowData.charity);
    const [isPending, setIsPending]= useState(false);

    // if there is an authorized user set the fetch options
    if (user) {
        options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                // definately needed for body to be passed in fetch
                'Content-type' : 'application/json'
            }
        };
    };

    const handleAction = (e) => {
        e.preventDefault();
        const payment = { _id, amount, charity };
        //console.log(JSON.stringify(Payment));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(payment)
        };

        console.log(options);

        setIsPending(true);

        fetch(`${SERVER_URL}/Payment`, options)
        .then(() => {
            console.log('new Payment added');
            setAmount('');
            setCharity('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '1200px',
        height: '200px',
        overflow: 'scroll'
    };

    return (
        <div className='action' style={myComponent}>
            <h1>Action Payment</h1>
            <form onSubmit={handleAction}>
                <label>Modify Payment id = {_id}</label>
                <label>Amount :</label>
                <textarea
                    required 
                    value={ amount }
                    // onChange={(e) => setAmount(e.target.value)}
                ></textarea>
                <label>Charity :</label>
                <textarea
                    required 
                    value={ charity }
                    // onChange={(e) => setCharity(e.target.value)}
                ></textarea>
                {!isPending && <button>Action Payment</button>}
                {isPending && <button disabled>Actioning Payment</button>}
            </form>
        </div>
    );
}

export default PaymentActionForm;