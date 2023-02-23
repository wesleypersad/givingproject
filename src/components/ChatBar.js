import React, { useState, useEffect } from 'react';

const ChatBar = ({ socket, room }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data));
    }, [socket, users]);

    return (
    <div className="chat__sidebar square border border-info border-2">
        <h2>Open Chat</h2>
        <div>
            <h4 className="chat__header text-start">CHAT ROOM : {room}</h4>
            <h4 className="chat__header text-start">ACTIVE USERS</h4>
            <div className="chat__users text-start">
                {users.map((user) => (
                <p key={user.socketID}>{user.userName}</p>
                ))}
            </div>
        </div>
    </div>
    );
};   

export default ChatBar;