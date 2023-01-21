import { useState } from "react";
//import useFetch from "../components/useFetch";
import { useContext } from "react";
import DataContext from "../context/DataContext";

function Textsms() {
    const [message, setMessage] = useState('EMPTY');
    const [confirm, setConfirm] = useState('EMPTY REPLY');
    const [email, setEmail] = useState('EMPTY');
    const [emconfirm, setEmconfirm] = useState('EMPTY REPLY');
    const { SERVER_URL, TWILIO_URL, SENDGRID_URL } = useContext(DataContext);

    const textSubmit = async (e) => {
        e.preventDefault();

        console.log('SMS SENT !!!')

        // get the required users (from the TWILIO JSON server)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: `${message}`})
        };

        const response = await fetch(`${SERVER_URL}/twilio`, requestOptions);
        const data = await response.json();
        setConfirm(data.message);
    };

    const emailSubmit = async (e) => {
        e.preventDefault();

        console.log('EMAIL SENT !!!')

        // get the required users (from the TWILIO JSON server)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: `${email}`})
        };

        const response = await fetch(`${SERVER_URL}/email`, requestOptions);
        const data = await response.json();
        setEmconfirm(data.message);
    };

    return (
        <div>
            <form className="textsms" onSubmit={textSubmit}>
                <h3>Send Text SMS</h3>
                <label>Message Text:</label>
                <input 
                    type="text" 
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button>Send SMS Message</button>
                <br />
                <label>Text Server Confimation </label>
                <p>{confirm}</p>
            </form>
            <form className="textemail" onSubmit={emailSubmit}>
            <h3>Send Email</h3>
                <label>Email Text:</label>
                <input 
                    type="text" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <button>Send EMail Message</button>
                <br />
                <label>Email Server Confimation </label>
                <p>{emconfirm}</p>
            </form>
        </div>
    )
}

export default Textsms;