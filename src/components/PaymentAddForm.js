import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function PaymentAddForm() {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    const [amount, setAmount] = useState();
    const [charity, setCharity] = useState();
    const [isPending, setIsPending]= useState(false);

    // if there is an authorized user set the fetch options
    if (user) {
        options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                // definately needed for body to be passed in fetch
                'Content-type' : 'application/json'
            }
        };
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const payment = { amount, charity };
        //console.log(JSON.stringify(payment));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(payment)
        };

        setIsPending(true);

        fetch(`${SERVER_URL}/payment`, options)
        .then(() => {
            console.log('new payment added');
            setAmount('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '90%',
        maxheight: '100px',
        overflow: 'scroll'
    };

    return (
        <div className='create' style={myComponent}>
            <h1>Add A New Payment</h1>
                <form onSubmit={handleCreate}>
                    <label>Create payment :</label>
                    <label>Amount :</label>
                    <textarea
                        required 
                        value={ amount }
                        onChange={(e) => setAmount(e.target.value)}
                    ></textarea>
                    <label>Charity :</label>
                    <textarea
                        required 
                        value={ charity }
                        onChange={(e) => setCharity(e.target.value)}
                    ></textarea>
                    {!isPending && <button>Add Payment</button>}
                    {isPending && <button disabled>Adding Payment</button>}
                </form>
        </div>
    );
}

export default PaymentAddForm;