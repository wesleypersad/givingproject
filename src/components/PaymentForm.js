import { useState, useEffect, useMemo } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function PaymentForm({ rowData }) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    //test for rowData cotaining anything useful
    const isEmpty = rowData === null || rowData === undefined || Object.keys(rowData).length === 0;
    //initialise state variables 
    const [_id, setId] = useState('');
    const [amount, setAmount] = useState('');
    const [charity, setCharity] = useState('');
    const [status, setStatus] = useState('');
    const [isPending, setIsPending]= useState(false);

    // if there is an authorized user set the fetch options
    let options = useMemo(() => {
        if (user) {
            return {
                //method: method,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    // definately needed for body to be passed in fetch
                    'Content-type' : 'application/json'
                }
            };
        };
        return {};
    }, [user]);

   // see if the rowData or empty status has changed
   useEffect(() => {
    if (!isEmpty) {
        setId(rowData._id);
        setAmount(rowData.amount);
        setCharity(rowData.charity);
        setStatus(rowData.status);
        } else {
        setId('');
        setAmount('');
        setCharity('');
        setStatus('');
    }
},[rowData, isEmpty]);

    // handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEmpty) {
            handleModify(e);
        } else {
            handleCreate(e);
        }
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const payment = { amount, charity, status};

        //modify request to type POST
        options.method = 'POST';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(payment)
        };

        setIsPending(true);

        //add the payment
        fetch(`${SERVER_URL}/payment`, options)
        .then(() => {
            console.log('new payment added');
            setAmount('');
            setCharity('');
            setStatus('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };

    const handleModify = (e) => {
        e.preventDefault();
        const thispayment = { _id, amount, status };
        //modify request to type PUT
        options.method = 'PUT';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(thispayment)
        };

        setIsPending(true);

        fetch(`${SERVER_URL}/payment`, options)
        .then(() => {
            console.log('new payment added');
            setAmount('');
            setCharity('');
            setStatus('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };

    const handleDelete = (e) => {
        // problem with useFetch hook so ordinary fetch used ?
        const thispayment = {_id};

        //modify request to type DELETE
        options.method = 'DELETE';

        options = { ...options,
            body: JSON.stringify(thispayment)
        };

        //delete the payment
        fetch(`${SERVER_URL}/payment`, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .then(() => {
            console.log('payment deleted');
            setAmount('');
            setCharity('');
            setStatus('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        });
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
            {!isEmpty ? <h1>Modify Payment</h1> : <h1>Add A Payment</h1>}
            <form onSubmit={handleSubmit}>
                <label>Amount:</label>
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
                {!isEmpty && 
                    <div>
                        <label>Status :</label>
                        <textarea
                            required 
                            value={ status }
                            onChange={(e) => setStatus(e.target.value)}
                        ></textarea>
                    </div>
                }
                {!isPending && 
                    (!isEmpty ? <button>Modify Payment</button> : <button>Add Payment</button>)
                }
                {isPending && 
                    (!isEmpty ? <button disabled>Modfying Payment</button> : <button disabled>Adding Payment</button>)
                }
            </form>
            {!isEmpty && <button onClick={() => handleDelete()}>Delete</button>}
        </div>
    );
}

export default PaymentForm;