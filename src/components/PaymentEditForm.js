import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function PaymentEditForm({rowData, setRowData}) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    const [_id, setId] = useState(rowData._id);
    const [amount, setAmount] = useState(rowData.amount);
    const [charity, setCharity] = useState(rowData.charity);
    const [status, setStatus] = useState(rowData.status);
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

    const handleModify = (e) => {
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

    const handleDelete = (e) => {
        // problem with useFetch hook so ordinary fetch used ?
        const payment = {_id};

        //modify request to type DELETE
        options.method = 'DELETE';

        options = { ...options,
            body: JSON.stringify(payment)
        };
        console.log(options);
        fetch(`${SERVER_URL}/skill`, options)
        .then(response => response.json())
        .then(data => console.log(data));
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: 'auto',
        height: 'auto',
        overflow: 'scroll'
    };

    return (
        <div className='create' style={myComponent}>
            <h1>Modify Payment</h1>
            <form onSubmit={handleModify}>
                <label>Modify Amount:</label>
                <textarea
                    required 
                    value={ amount }
                    onChange={(e) => setAmount(e.target.value)}
                ></textarea>
                <label>Charity:</label>
                <textarea
                    required 
                    value={ charity }
                    onChange={(e) => setCharity(e.target.value)}
                ></textarea>
                <label>Status:</label>
                <textarea
                    required 
                    value={ status }
                    onChange={(e) => setStatus(e.target.value)}
                ></textarea>
                {!isPending && <button>Modify Payment</button>}
                {isPending && <button disabled>Modifying Payment</button>}
            </form>
            <button onClick={() => handleDelete()}>Delete</button>
        </div>
    );
}

export default PaymentEditForm;