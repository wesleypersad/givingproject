//import logo from './GivingLogo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import socketIO from 'socket.io-client';

//import the navigation & main function
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Chat from "./pages/Chat";
import Donate from "./pages/Donate";
import Booking from "./pages/Booking";
import Textsms from "./pages/Textsms";
import Research from "./pages/Research";
import Admin from "./pages/Admin";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/Notfound";
import ChatPage from './components/ChatPage';

// get the server URL directly from the environment variables
const { REACT_APP_SERVER_URL } = process.env;
const socket = socketIO.connect(`${REACT_APP_SERVER_URL}`);

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} /> 
            <Route path="/chat" element={<Chat socket={socket}/>} />
            <Route path="/chatpage" element={<ChatPage socket={socket} />}></Route>
            <Route path="/donate" element={<Donate />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/textsms" element={<Textsms />} />            
            <Route path="/research" element={<Research />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
