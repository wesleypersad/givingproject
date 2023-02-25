import { Container, Button } from 'react-bootstrap';
import { useState } from "react";
//import useFetch from "../components/useFetch";
import { useContext } from "react";
import DataContext from "../context/DataContext";

function Textsms() {
    const [message, setMessage] = useState('EMPTY');
    const [confirm, setConfirm] = useState('EMPTY REPLY');
    const [email, setEmail] = useState('EMPTY');
    const [emconfirm, setEmconfirm] = useState('EMPTY REPLY');
    const [sendnum, setSendnum] = useState('+14246553367');
    const [recvnum, setRecvnum] = useState('+447398787851');
    const [sendemail, setSendemail] = useState('vasudeo.persad@gmail.com');
    const [recvemail, setRecvemail] = useState('vas.udeo.persad@gmail.com');
    const { SERVER_URL } = useContext(DataContext);

    const textSubmit = async (e) => {
        e.preventDefault();

        console.log('SMS SENT !!!');

        //now set the values within smsbody
        let smsbody = { sendnum, recvnum, message:email };

        // get the required users (from the TWILIO JSON server)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ message: `${message}`})
            body: JSON.stringify(smsbody)
        };

        const response = await fetch(`${SERVER_URL}/send/sms`, requestOptions);
        const data = await response.json();
        setConfirm(data.message);
    };

    const emailSubmit = async (e) => {
        e.preventDefault();

        console.log('EMAIL SENT !!!');

        //now set the values within emailbody
        let emailbody = { sendemail, recvemail, email };

        // get the required users (from the TWILIO JSON server)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ message: `${email}`})
            body: JSON.stringify(emailbody)
        };

        const response = await fetch(`${SERVER_URL}/send/email`, requestOptions);
        const data = await response.json();
        setEmconfirm(data.message);
    };

    return (
        <div className="textsms container square border border-info border-2">
            <h1>SMS & Email Page</h1>
            <Container>
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
            </Container>
            <Container>
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
            </Container>
        </div>
    )
}

export default Textsms;