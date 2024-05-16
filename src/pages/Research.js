import '../App.css';
import { Container, Button } from 'react-bootstrap';
import { React, useState, useEffect } from "react";
import { useContext } from "react";
import useFetch from "../components/useFetch";
import DataContext from "../context/DataContext";
import Table from "../components/Table";
import research from '../images/research.jpg';                // image by freepix

function Research () {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);

    // define the constants and functions to get the JSON data
    const [charityList, setCharityList] = useState();
    const [charityDetails, setCharityDetails] = useState();
    const [charityFinancials, setCharityFinancials] = useState();
    const [charityName, setCharityName] = useState('salvation army');
    const [charityNumber, setCharityNumber] = useState('214779');

    // for charity slected from table
    const [highlightedRow, setHighlightedRow] = useState(-99);
    const [rowDataCharity, setRowDataCharity] = useState([]);

    // request charity list of that name
    const { data: charities, isPending, error } = useFetch(`${SERVER_URL}/charity/searchname/${charityName}`);
    const reqList = () => {
        if (charities && !isPending && !error) {
            setCharityList(charities);
            console.log(charities);
        };
    };

    // request charity details
    const { data: details, isPending2, error2 } = useFetch(`${SERVER_URL}/charity/details/${charityNumber}`);
    const reqDetails = () => {
        if (details && !isPending2 && !error2) {
            setCharityDetails(details);
            console.log(details);
        };
    };

    // request charity financial details
    const { data: financials, isPending3, error3 } = useFetch(`${SERVER_URL}/charity/financialhistory/${charityNumber}`);
    const reqFinancials = () => {
        if (financials && !isPending3 && !error3) {
            setCharityFinancials(financials);
            console.log(financials);
        };
    };

    // when highlightedRow changes get the data
    // for charity list
    useEffect(() => {
        if (highlightedRow >= 0) {
            setRowDataCharity(charityList[highlightedRow]);
            setCharityNumber(`${charityList[highlightedRow].reg_charity_number}`);
        } else {
            setRowDataCharity([{}]);
        }
    }, [charityList, highlightedRow]);

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '90%',
        maxheight: 'auto',
        overflow: 'scroll'
    };

    return (
        <div className="research container square border border-info border-2" style={{backgroundImage:`url(${research})`}} >
            <h1>Research Page</h1>
            <h3>Charity Name</h3>
            <label>Enter Name:</label>
            <input 
                type="text" 
                onChange={(e) => setCharityName(e.target.value)}
                value={charityName}
            />
            <Container>
                {!isPending && <Button onClick={reqList} variant="primary">Get List Of Charities</Button>}
                {isPending && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error && <div>{error}</div>}
                {charityList && <Table tbodyData={charityList} highlightedRow={highlightedRow} setHighlightedRow ={setHighlightedRow} />}
                {/* <p>{JSON.stringify(rowDataCharity)}</p> */}
            </Container>            
            <h3>Charity Number</h3>
            <label>Enter Number:</label>
            <input 
                type="text" 
                onChange={(e) => setCharityNumber(e.target.value)}
                value={charityNumber}
            />
            <Container style={myComponent}>
                {!isPending2 && <Button onClick={reqDetails} variant="primary">Get Charity Details</Button>}
                {isPending2 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error2 && <div>{error2}</div>}
                <pre>{JSON.stringify(charityDetails, null, 2)}</pre>
            </Container>
            <Container  style={myComponent}>
                {!isPending3 && <Button onClick={reqFinancials} variant="primary">Get Financial History</Button>}
                {isPending3 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error3 && <div>{error3}</div>}
                {charityFinancials && <Table tbodyData={charityFinancials}/>}
                {/* <pre>{JSON.stringify(charityFinancials, null, 2)}</pre> */}
            </Container>
        </div>
    );
}

export default Research;