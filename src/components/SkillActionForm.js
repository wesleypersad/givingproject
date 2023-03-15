import { useState, useEffect } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import EventAddForm from './EventAddForm';
import useFetch from "../components/useFetch";
import '../App.css';

function SkillActionForm({rowData, setRowData}) {
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
    const [skills, setSkills] = useState(rowData.skills);

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
            <h1>Action Skill</h1>
            <form>
                <label>Modify Skills:</label>
                <textarea
                    className="form-control"
                    required 
                    value={ skills }
                    // onChange={(e) => setAmount(e.target.value)}
                    readOnly
                ></textarea>
            </form>
            <div>
                <label>Enter Message:</label>
                <input 
                    type="text" 
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
            </div>
            <div>
                <label>Sender Number:</label>
                <input 
                    type="text" 
                    onChange={(e) => setSendnum(e.target.value)}
                    value={sendnum}
                />
                <label>Receiver Number:</label>
                <input 
                    type="text" 
                    onChange={(e) => setRecvnum(e.target.value)}
                    value={recvnum}
                />
                <button onClick={smsSubmit}>Send SMS Message</button>
                <br />
                <label>SMS Server Confimation </label>
                <p>{confirmSms}</p>
            </div>
            <div>
                <label>Sender Email:</label>
                <input 
                    type="text" 
                    onChange={(e) => setSendemail(e.target.value)}
                    value={sendemail}
                />
                <label>Receiver Email:</label>
                <input 
                    type="text" 
                    onChange={(e) => setRecvemail(e.target.value)}
                    value={recvemail}
                />
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

export default SkillActionForm;