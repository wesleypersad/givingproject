import '../App.css';
import { Container, Button, Card } from 'react-bootstrap';
import { useState } from "react";
import { useContext } from "react";
import useFetch from "../components/useFetch";
import DataContext from "../context/DataContext";

function Research () {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);

    // define the constants and functions to get the JSON data
    const [charityList, setCharityList] = useState("EMPTY CHARITIES...");

    // request the charities data
    const { data: charities, isPending, error } = useFetch(`${SERVER_URL}/charity`);
    const reqCharity = () => { 
        setCharityList(JSON.stringify(charities));
        console.log(charities);
    };

    return (
        <div className="research">
            <Container>
                <Card className="mb-3" style={{ color: "#000"}}>
                    <Card.Body>
                    <Card.Title>Charities</Card.Title>
                    </Card.Body>
                    <Card.Text>
                        {charityList}
                    </Card.Text>
                    <Button onClick={reqCharity} variant="primary">Get remote charity JSON Data</Button>
                </Card>
            </Container>
        </div>
    );
}

export default Research;