
import "../App.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext, useEffect, useMemo } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import useFetch from "../components/useFetch";

const Footer = ({ socket }) => {
    // from  the data context
    const { 
        userCount, setUserCount, skillCount, setSkillCount, paymentCount, setPaymentCount, 
        itemCount, setItemCount, eventCount, setEventCount, blogCount, setBlogCount,
        SERVER_URL
    } = useContext(DataContext);
    const { user } = useAuthContext();

    // set options for the fetch with user dependancy
    const options = useMemo(() => {
        if (user) {
            return {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };
        };
        return {};
    }, [user]);

    // load up the numbers
    const { data: userKount, isPending, isError } = useFetch(`${SERVER_URL}/noauth/usercount`, options);
    const { data: skillKount, isPending2, isError2 } = useFetch(`${SERVER_URL}/noauth/skillcount`, options);
    const { data: paymentKount, isPending3, isError3 } = useFetch(`${SERVER_URL}/noauth/paymentcount`, options);
    const { data: itemKount, isPending4, isError4 } = useFetch(`${SERVER_URL}/noauth/itemcount`, options);
    const { data: eventKount, isPending5, isError5 } = useFetch(`${SERVER_URL}/noauth/eventcount`, options);
    const { data: blogKount, isPending6, isError6 } = useFetch(`${SERVER_URL}/noauth/blogcount`, options);

    // set the numbers
    useEffect(() => {
        setUserCount(userKount);
    }, [userKount, setUserCount, isPending, isError]);
    useEffect(() => {
        setSkillCount(skillKount);
    }, [skillKount, setSkillCount, isPending2, isError2]);
    useEffect(() => {
        setPaymentCount(paymentKount);
    }, [paymentKount, setPaymentCount, isPending3, isError3]);
    useEffect(() => {
        setItemCount(itemKount);
    }, [itemKount, setItemCount, isPending4, isError4]);
    useEffect(() => {
        setEventCount(eventKount);
    }, [eventKount, setEventCount, isPending5, isError5]);
    useEffect(() => {
        setBlogCount(blogKount);
    }, [blogKount, setBlogCount, isPending6, isError6]);

    const year = new Date().getFullYear();

    const myNumbers = {
        color: 'white',
        background: 'limegreen',
        fontSize: '20px'
    };

    return (
        <div className="square border border-info border-2 footer">            
            <h2>The Numbers</h2>
            <Container style={myNumbers}>
                <Row>
                    <Col md={3}><p>{userCount} Users</p></Col>
                    <Col md={3}><p>{skillCount} Skills</p></Col>
                    <Col md={3}><p>{paymentCount} Payments</p></Col>
                </Row>
                <Row>
                    <Col md={3}><p>{itemCount} Items</p></Col>
                    <Col md={3}><p>{eventCount} Events</p></Col>
                    <Col md={3}><p>{blogCount} Blogs</p></Col>
                </Row>
            </Container>
            <footer>{`Copyright @ The Giving App ${year}`}</footer>
        </div>
    );
};

export default Footer;