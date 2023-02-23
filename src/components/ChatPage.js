//import { Container, Button } from 'react-bootstrap';
import DataContext from "../context/DataContext";
import { useContext } from "react";
import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
    // from  the data context
    const { room, setRoom } = useContext(DataContext);
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState('');
    const lastMessageRef = useRef(null);

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data));
    }, [socket]);

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '90%',
    };

    return (
    <div className="chat container square border border-info border-2">
        <ChatBar socket={socket} room={room} />
        <div className="chat__main" style={myComponent}>
            <ChatBody
                messages={messages}
                typingStatus={typingStatus}
                lastMessageRef={lastMessageRef}
            /> 
        </div>
        <ChatFooter socket={socket} />
    </div>
    );
};

export default ChatPage;