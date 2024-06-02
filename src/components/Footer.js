import "../App.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Footer = ({ socket }) => {
    // from  the data context
    const { 
        userCount, skillCount, paymentCount, itemCount, eventCount, blogCount
    } = useContext(DataContext);

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