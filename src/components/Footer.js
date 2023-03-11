
import "../App.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext, useEffect } from "react";
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

    let options = {};

    // see if there is an authorized user
    if (user) {
        options = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        };
    };

    // load up the numbers
    const { data: userKount, isPending, isError } = useFetch(`${SERVER_URL}/user/count`, options);
    const { data: skillKount, isPending2, isError2 } = useFetch(`${SERVER_URL}/skill/count`, options);
    const { data: paymentKount, isPending3, isError3 } = useFetch(`${SERVER_URL}/payment/count`, options);
    const { data: itemKount, isPending4, isError4 } = useFetch(`${SERVER_URL}/item/count`, options);
    const { data: eventKount, isPending5, isError5 } = useFetch(`${SERVER_URL}/event/count`, options);
    const { data: blogKount, isPending6, isError6 } = useFetch(`${SERVER_URL}/blog/count`, options);

    // set the numbers
    useEffect(() => {
        setUserCount(userKount);
    }, [userKount, isPending, isError]);
    useEffect(() => {
        setSkillCount(skillKount);
    }, [skillKount, isPending2, isError2]);
    useEffect(() => {
        setPaymentCount(paymentKount);
    }, [paymentKount, isPending3, isError3]);
    useEffect(() => {
        setItemCount(itemKount);
    }, [itemKount, isPending4, isError4]);
    useEffect(() => {
        setEventCount(eventKount);
    }, [eventKount, isPending5, isError5]);
    useEffect(() => {
        setBlogCount(blogKount, isError6);
    }, [blogKount, isPending6]);

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