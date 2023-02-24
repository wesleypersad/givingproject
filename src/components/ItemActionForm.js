import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import EventAddForm from './EventAddForm';
import '../App.css';

function ItemActionForm({rowData, setRowData}) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    const [message, setMessage] = useState('EMPTY MESSAGE ...');
    const [confirmSms, setConfirmSms] = useState('EMPTY SMS REPLY');
    const [confirmEmail, setConfirmEmail] = useState('EMPTY EMAIL REPLY');

    const [_id, setId] = useState(rowData._id);
    const [description, setDescription] = useState(rowData.description);

    // function for sending SMS via TWILIO server
    const smsSubmit = async (e) => {
        e.preventDefault();

        console.log('SMS SENT !!!')

        // get the required users (from the TWILIO JSON server)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: `${message}`})
        };

        const response = await fetch(`${SERVER_URL}/send/sms`, requestOptions);
        const data = await response.json();
        setConfirmSms(data.message);
    };

    // function for sending EMail via Sendgrid
    const emailSubmit = async (e) => {
        e.preventDefault();

        console.log('EMAIL SENT !!!')

        // get the required users (from the TWILIO JSON server)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: `${message}`})
        };

        const response = await fetch(`${SERVER_URL}/send/email`, requestOptions);
        const data = await response.json();
        setConfirmEmail(data.message);
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
            <h1>Action Item</h1>
            <form>
                <label>Modify Item id = {_id}</label>
                <label>Description :</label>
                <textarea
                    required 
                    value={ description }
                    // onChange={(e) => setAmount(e.target.value)}
                    readOnly
                ></textarea>
            </form>
            <div>
                <label>Enter Message</label>
                <input 
                    type="text" 
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
            </div>
            <div>
                <label>Send SMS Message To Doner</label>
                <button onClick={smsSubmit}>Send SMS Message</button>
                <br />
                <label>SMS Server Confimation </label>
                <p>{confirmSms}</p>
            </div>
            <div>
                <label>Send Email Message To Doner</label>
                <button onClick={emailSubmit}>Send Email Message</button>
                <br />
                <label>Email Server Confimation </label>
                <p>{confirmEmail}</p>
            </div>
            <div>
                <label>Schedule A Meeting With Doner</label>
                <EventAddForm />
            </div>
        </div>
    );
}

export default ItemActionForm;