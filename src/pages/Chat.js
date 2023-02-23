import "../App.css";
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import DataContext from "../context/DataContext";
import { useContext } from "react";
import Select from 'react-select';

function Chat({ socket }) {
    // from  the data context
    const { room, setRoom } = useContext(DataContext);
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [userName, setUserName] = useState(`${user.username}`);
    //const [room, setRoom] = useState('payments');

    //define the options for rooms
    const options = [
        { value: 'payments', label: 'Payments' },
        { value: 'skills', label: 'Skills' },
        { value: 'items', label: 'Items' }
    ];

    //define a function to handle the room selection
    const handleRoomChange = (selectedOption) => {
        setRoom(selectedOption.value);
        console.log(`Option selected:`, selectedOption);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName);
        //sends the username and socket ID to the Node.js server
        //socket.emit('newUser', { userName, socketID: socket.id, room });
        socket.emit('joinRoom', { userName, socketID: socket.id, room });
        navigate('/chatpage');
    };

    console.log(socket.id);

    return (
        <div className="chat container square border border-info border-2">
            <h1>Chat Page</h1>
            <Container>
                <form className="home__container" onSubmit={handleSubmit}>
                    <h2 className="home__header">Sign In To Selected Chat Room</h2>
                    <Select options={options} onChange={handleRoomChange} autoFocus={true} defaultValue={options.filter(option => {if (option.value === room) return option})} />
                    <button className="home__cta">SIGN IN</button>
                </form>                
            </Container>
        </div>
    );
}

export default Chat;