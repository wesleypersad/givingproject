import { useState, useEffect } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
//import EventAddForm from './EventAddForm';
import EventForm from './EventForm';
import useFetch from "../components/useFetch";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

function ActionForm({ rowData, isItem }) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    //request the current user data
    const { data:sender, isPending, error } = useFetch(`${SERVER_URL}/user/${user.username}`);

    //get the doner from the row data
    //const { data:doner, isPending2, error2 } = useFetch(`${SERVER_URL}/user/${rowData.userid}`);

    // email and number state variable for message
    const [sendnum, setSendnum] = useState('NOT SET');
    const [recvnum, setRecvnum] = useState('+447398787851');
    const [sendemail, setSendemail] = useState('NOT SET');
    const [recvemail, setRecvemail] = useState('vas.udeo.persad@gmail.com');

    const [message, setMessage] = useState('EMPTY MESSAGE ...');
    const [confirmSms, setConfirmSms] = useState('EMPTY SMS REPLY');
    const [confirmEmail, setConfirmEmail] = useState('EMPTY EMAIL REPLY');

    const [_id, setId] = useState(rowData._id);
    const [task, setTask] = useState(isItem ? rowData.description : rowData.skills);

    // set the current user's mobile and email in the form
    useEffect(() => {
        if (sender) {
            setSendnum(sender[0].mobile);
            setSendemail(sender[0].email);
        };
    }, [sender]);

    // set the doner's mobile and email in the form
    /*     useEffect(() => {
        if (doner) {
            setRecvnum(doner[0].mobile);
            setRecvemail(doner[0].email);
        };
    }, [doner]); */

    // function for sending SMS via TWILIO server
    const smsSubmit = async (e) => {
        e.preventDefault();

        console.log('SMS SENT !!!');

        //now set the values within smsbody
        let smsbody = { sendnum, recvnum, message };

        // get the required users (from the TWILIO JSON server)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ message: `${message}`})
            body: JSON.stringify(smsbody)
        };

        const response = await fetch(`${SERVER_URL}/send/sms`, requestOptions);
        const data = await response.json();
        setConfirmSms(data.message);
    };

    // function for sending EMail via Sendgrid
    const emailSubmit = async (e) => {
        e.preventDefault();

        console.log('EMAIL SENT !!!');

        //now set the values within emailbody
        let emailbody = { sendemail, recvemail, message };

        // get the required users (from the TWILIO JSON server)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ message: `${email}`})
            body: JSON.stringify(emailbody)
        };

        const response = await fetch(`${SERVER_URL}/send/email`, requestOptions);
        const data = await response.json();
        setConfirmEmail(data.message);
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
            {isItem ? <h1>Action Item</h1> : <h1>Action Skills</h1>}
            <form className="p-3">
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        id="floatingTextarea"
                        required 
                        value={ task }
                        // onChange={(e) => setAmount(e.target.value)}
                        readOnly
                    ></textarea>
                    {
                        isItem ? <label htmlFor="floatingTextarea">Items:</label> : <label htmlFor="floatingTextarea">Skills:</label>     
                    }
                </div>
                <div className="form-floating mb-3">                    
                    <input
                        className='form-control' 
                        type="text" 
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                </div>
                <hr />
                <div className="form-floating mb-3">
                    <input
                        className='form-control'
                        id="floatingTextarea2"
                        type="text" 
                        onChange={(e) => setSendnum(e.target.value)}
                        value={sendnum}
                    />
                    <label htmlFor="floatingTextarea2">Sender Number:</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        className='form-control'
                        id="floatingTextarea3" 
                        type="text" 
                        onChange={(e) => setRecvnum(e.target.value)}
                        value={recvnum}
                    />
                    <label htmlFor="floatingTextarea3">Receiver Number:</label>
                </div>
                <div className="d-flex justify-content-between">
                    <button onClick={smsSubmit}>Send SMS Message</button>
                    <p>SMS Confimation: {confirmSms}</p>
                </div>
                <hr />
                <div className="form-floating mb-3"> 
                    <input
                        className='form-control'
                        id="floatingTextarea4" 
                        type="text" 
                        onChange={(e) => setSendemail(e.target.value)}
                        value={sendemail}
                    />
                    <label htmlFor="floatingTextarea4">Sender Email:</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                        className='form-control'
                        id="floatingTextarea5"
                        type="text" 
                        onChange={(e) => setRecvemail(e.target.value)}
                        value={recvemail}
                    />
                    <label htmlFor="floatingTextarea5">Receiver Email:</label>
                </div>
                <div className="d-flex justify-content-between">
                    <button onClick={emailSubmit}>Send Email Message</button>
                    <label> </label>
                    <p>Email Confimation: {confirmEmail}</p>
                </div>
                <hr />
                <div>
                    <EventForm />
                </div>
            </form>
        </div>
    );
}

export default ActionForm;