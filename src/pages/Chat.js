import "../App.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function Chat({ socket }) {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [userName, setUserName] = useState(`${user.username}`);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName);
        //sends the username and socket ID to the Node.js server
        socket.emit('newUser', { userName, socketID: socket.id });
        navigate('/chatpage');
    };
    
    console.log(socket.id);

    return (
        <form className="home__container" onSubmit={handleSubmit}>
            <h2 className="home__header">Sign in to Open Chat</h2>
            <label htmlFor="username"></label>
{/*             <input
                type="text"
                minLength={6}
                name="username"
                id="username"
                className="username__input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            /> */}
            <button className="home__cta">SIGN IN</button>
        </form>
    );
}

export default Chat;