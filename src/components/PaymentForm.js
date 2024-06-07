import { useState, useEffect, useMemo } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import useSessionStorage from '../customHooks/useSessionStorage';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

function PaymentForm({ rowData, setPaymentList, sesStoreName = 'payments' }) {
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
    // use the session storage hook to store the user token
    const { deleteRecord, modifyRecord, addRecord } = useSessionStorage(sesStoreName);

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
        let payment = { amount, charity, status};

        //modify request to type POST
        options.method = 'POST';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(payment)
        };

        setIsPending(true);

        //add the payment
        fetch(`${SERVER_URL}/payment`, options)
        .then(response => response.json())
        .then(data => {
            console.log('new payment added');
            setAmount('');
            setCharity('');
            setStatus('');
            setIsPending(false);
            //navigate('/donate');
            //window.location.reload();
            payment = {...data};
            //add the item to the session storage and update the list
            const {recordData} = addRecord(payment);
            setPaymentList(recordData);
        });
    };

    const handleModify = (e) => {
        e.preventDefault();
        const thispayment = { _id, amount, charity, status };
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
            //window.location.reload();
        });

        // modify the item from session storage and update the list
        const {recordData} = modifyRecord(thispayment);
        setPaymentList(recordData);
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
            //window.location.reload();
        });
        
        // delete the item from session storage and update the list
        const {recordData} = deleteRecord(_id);
        setPaymentList(recordData);
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
            <form className="p-3" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control" 
                        id="floatingTextarea" 
                        required 
                        value={ amount }
                        onChange={(e) => setAmount(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea">Amount:</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        id="floatingTextarea2"
                        required 
                        value={ charity }
                        onChange={(e) => setCharity(e.target.value)}
                    ></textarea>      
                    <label htmlFor="floatingTextarea2">Charity:</label>
                </div>                
                {!isEmpty && 
                    <div className="form-floating mb-3">                        
                        <textarea
                            className="form-control"
                            id="floatingTextarea3"
                            required 
                            value={ status }
                            onChange={(e) => setStatus(e.target.value)}
                        ></textarea>
                        <label htmlFor="floatingTextarea3">Status :</label>
                    </div>
                }
                <div  className="d-flex justify-content-between">
                    {!isPending && 
                        (!isEmpty ? <button>Modify Payment</button> : <button>Add Payment</button>)
                    }
                    {isPending && 
                        (!isEmpty ? <button disabled>Modfying Payment</button> : <button disabled>Adding Payment</button>)
                    }
                    {!isEmpty && <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>}
                </div>                
            </form>
        </div>
    );
}

export default PaymentForm;