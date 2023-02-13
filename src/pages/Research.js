import '../App.css';
import { Container, Button } from 'react-bootstrap';
import { useState } from "react";
import { useContext } from "react";
import useFetch from "../components/useFetch";
import DataContext from "../context/DataContext";
import Table from "../components/Table";

function Research () {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);

    // define the constants and functions to get the JSON data
    const [charityList, setCharityList] = useState([{}]);
    const [charityDetails, setCharityDetails] = useState([{}]);
    const [charityFinancials, setCharityFinancials] = useState([{}]);
    const [charityName, setCharityName] = useState('EMPTY NAME');
    const [charityNumber, setCharityNumber] = useState('214779');

    // request charity list of that name
    const { data: charities, isPending, error } = useFetch(`${SERVER_URL}/charity/searchname/${charityName}`);
    const reqList = () => {
        setCharityList(charities);
        console.log(charities);
    };

    // request charity details
    const { data: details, isPending2, error2 } = useFetch(`${SERVER_URL}/charity/details/${charityNumber}`);
    const reqDetails = () => { 
        setCharityDetails(details);
        console.log(details);
    };

    // request charity financial details
    const { data: financials, isPending3, error3 } = useFetch(`${SERVER_URL}/charity/financialhistory/${charityNumber}`);
    const reqFinancials = () => {
        setCharityFinancials(financials);
        console.log(financials);
    };

    return (
        <div className="research">
            <h1>Research Page</h1>
            <h3>Charity Name</h3>
            <label>Enter Name:</label>
            <input 
                type="text" 
                onChange={(e) => setCharityName(e.target.value)}
                value={charityName}
            />
            <Container>
                <Button onClick={reqList} variant="primary">Get List Of Charities</Button>
                {charityList && <Table tbodyData={charityList}/>}
            </Container>            
            <h3>Charity Number</h3>
            <label>Enter Number:</label>
            <input 
                type="text" 
                onChange={(e) => setCharityNumber(e.target.value)}
                value={charityNumber}
            />
            <Container>
                <Button onClick={reqDetails} variant="primary">Get Charity Details</Button>
                {charityDetails && <p>{JSON.stringify(charityDetails)}</p>}
                {/* {charityDetails && <Table tbodyData={charityDetails}/>} */}
            </Container>
            <Container>
                <Button onClick={reqFinancials} variant="primary">Get Financial History</Button>
                {charityFinancials && <Table tbodyData={charityFinancials}/>}
            </Container>
        </div>
    );
}

export default Research;