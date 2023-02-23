import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ messages, typingStatus }) => {
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem('userName');
        navigate('/');
        window.location.reload();
    };

    return (
    <div className="square border border-success border-2">
        <header className="chat__mainHeader">
            <p>Hangout with Colleagues</p>
            <button className="leaveChat__btn" onClick={handleLeaveChat}>
                LEAVE CHAT
            </button>
        </header>

        {/*This shows messages sent from you*/}
        <div className="message__container">
            {messages.map((message) =>
                message.name === localStorage.getItem('userName') ? (
                    <div className="message__chats" key={message.id}>
                        <div className="message__sender text-start">
                            <p><strong>[{message.time},{message.name}]</strong> {message.text}</p>
                        </div>
                    </div>
                ) : (
                    <div className="message__chats" key={message.id}>
                        <div className="message__recipient text-start">
                            <p><strong>[{message.time},{message.name}]</strong> {message.text}</p>
                        </div>
                    </div>
                )
            )}

        {/*This is triggered when a user is typing*/}
            <div className="message__status">
                <p>{typingStatus}</p>
            </div>
        </div>
    </div>
    );
};

export default ChatBody;