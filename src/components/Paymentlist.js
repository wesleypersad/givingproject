import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';

const  PaymentList= ({payments}) => {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    const title = 'List Of Payments';
    let options = {};

    // if there is an authorized user set the fetch options
    if (user) {
        options = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                // definately needed for body to be passed in fetch
                'Content-type' : 'application/json'
            }
        };
    };

    // add the _id to the body of the fetch options
    const handleClick = async (_id) => {
        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify({"_id": `${_id}`})
        };
        console.log(options);
        fetch(`${SERVER_URL}/payment`, options)
        .then(response => response.json())
        .then(data => console.log(data));
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '1200px',
        height: '200px',
        overflow: 'scroll'
    };

    return (
        <div className="payment-list">
            <h2>{ title }</h2>
            {payments.map((payment) => (
                <div className="payment-details" key={payment._id} style={myComponent}>
                    <div>
                        <h2>{ payment.amount }</h2>
                        <p>Donated by <strong>{payment.donerid}</strong></p>
                        <p>Donated to <strong>{payment.charity}</strong></p>
                    </div>
                    <span onClick={() => handleClick(payment._id)}>Delete</span>
                </div>
            ))}
        </div>
    );
}

export default PaymentList;