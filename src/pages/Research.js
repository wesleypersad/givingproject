import '../App.css';
import { Container, Button } from 'react-bootstrap';
import { React, useState, useEffect, useMemo } from "react";
import { useContext } from "react";
import GetStore from '../functions/GetStore';
import DataContext from "../context/DataContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Table from "../components/Table";
import research from '../images/research.jpg';                // image by freepix
import useDebounce from '../customHooks/useDebounce';

function Research () {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    // see if there is an authorized user also put the user in the body 
    // to ensure we can filter the blog results as authorisation no loger required
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

    // define the constants and functions to get the JSON data
    const [charityList, setCharityList] = useState();
    const [charityDetails, setCharityDetails] = useState();
    const [charityFinancials, setCharityFinancials] = useState();
    const [charityName, setCharityName] = useState('salvation army');
    const debouncedCharityName = useDebounce(charityName);
    const [charityNumber, setCharityNumber] = useState('214779');
    const debouncedCharityNumber = useDebounce(charityNumber);

    // for charity selected from table
    const [highlightedRow, setHighlightedRow] = useState(-99);
    const [rowDataCharity, setRowDataCharity] = useState([]);

    //state variables for display of tables
    const [dispList, setDispList] = useState(false);
    const [dispDetails, setDispDetails] = useState(false);
    const [dispFin, setDispFin] = useState(false);

    //toggle display variables
    const handleDispList = () => {
        setDispList(!dispList);
    };
    const handleDispDetails = () => {
        setDispDetails(!dispDetails);
    };
    const handleDispFin = () => {
        setDispFin(!dispFin);
    };

    // request charity list of that name and populate the charity list
    const { data: charities, isPending, error } = GetStore(`${SERVER_URL}/charity/searchname/${debouncedCharityName}`, options, `${debouncedCharityName}`);

    useEffect(() => {
        if (charities) {
            setCharityList(charities);
            console.log(charities);
            setHighlightedRow(-99);
        };
    }, [charities, isPending, error]);

    // request charity details and populate the charity details
    const { data: details, isPending: isPending2, error: error2 } = GetStore(`${SERVER_URL}/charity/details/${debouncedCharityNumber}`, options, `${debouncedCharityNumber}dets`);

    useEffect(() => {
        if (details) {
            setCharityDetails(details);
            console.log(details);
        };
    }, [details, isPending2, error2]);

    // request charity financial details and populate the charity financial details
    const { data: financials, isPending: isPending3, error: error3 } = GetStore(`${SERVER_URL}/charity/financialhistory/${debouncedCharityNumber}`, options, `${debouncedCharityNumber}finans`);

    useEffect(() => {
        if (financials) {
            setCharityFinancials(financials);
            console.log(financials);
        };
    }, [financials, isPending3, error3]);

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
            {/* <h3>Charity Name</h3> */}
            <div className="form-floating">
                <input
                    className="form-control" 
                    id="floatingTextarea1"
                    type="text" 
                    onChange={(e) => setCharityName(e.target.value)}
                    value={charityName}
                />
                <label htmlFor="floatingTextarea1">Charity Name:</label>
            </div>
            <Container>
                {isPending && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error && <div>{error}</div>}
                {!isPending && <Button onClick={handleDispList} variant="primary">Show List Of Charities</Button>}
                {dispList && <Table tbodyData={charityList} highlightedRow={highlightedRow} setHighlightedRow ={setHighlightedRow} />}
            </Container>            
            {/* <h3>Charity Number</h3> */}
            <div className="form-floating">
                <input
                    className="form-control" 
                    id="floatingTextarea2"
                    type="text" 
                    onChange={(e) => setCharityNumber(e.target.value)}
                    value={charityNumber}
                />
                <label htmlFor="floatingTextarea2">Charity Number:</label>
            </div>
            <Container style={myComponent}>
                {isPending2 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error2 && <div>{error}</div>}
                {!isPending2 && <Button onClick={handleDispDetails} variant="primary">Show Charity Details</Button>}
                {dispDetails && <pre>{JSON.stringify(charityDetails, null, 2)}</pre>}
            </Container>
            <Container  style={myComponent}>
                {isPending3 && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                {error3 && <div>{error3}</div>}
                {!isPending3 && <Button onClick={handleDispFin} variant="primary">Show Financial History</Button>}
                {dispFin && <Table tbodyData={charityFinancials}/>}
            </Container>
        </div>
    );
}

export default Research;