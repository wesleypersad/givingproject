import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function ItemActionForm({rowData, setRowData}) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    console.log('ACTION FORM=', rowData);

    const [_id, setId] = useState(rowData._id);
    const [description, setDescription] = useState(rowData.description);
    const [isPending, setIsPending]= useState(false);

    // if there is an authorized user set the fetch options
    if (user) {
        options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                // definately needed for body to be passed in fetch
                'Content-type' : 'application/json'
            }
        };
    };

    const handleAction = (e) => {
        e.preventDefault();
        const item = { _id, description };
        //console.log(JSON.stringify(Item));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(item)
        };

        console.log(options);

        setIsPending(true);

        fetch(`${SERVER_URL}/item`, options)
        .then(() => {
            console.log('new item added');
            setDescription('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '1200px',
        height: '200px',
        overflow: 'scroll'
    };

    return (
        <div className='action' style={myComponent}>
            <h1>Action Item</h1>
            <form onSubmit={handleAction}>
                <label>Modify Item id = {_id}</label>
                <label>Description :</label>
                <textarea
                    required 
                    value={ description }
                    // onChange={(e) => setAmount(e.target.value)}
                    readOnly
                ></textarea>
                {!isPending && <button>Action Item</button>}
                {isPending && <button disabled>Actioning Item</button>}
            </form>
        </div>
    );
}

export default ItemActionForm;