import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function ItemEditForm({rowData, setRowData}) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    console.log('EDIT FORM=', rowData);

    const [_id, setId] = useState(rowData._id);
    const [description, setDescription] = useState(rowData.description);
    const [status, setStatus] = useState(rowData.status);
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

    const handleModify = (e) => {
        e.preventDefault();
        const item = { _id, description };
        //console.log(JSON.stringify(item));

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

    const handleDelete = (e) => {
        // problem with useFetch hook so ordinary fetch used ?
        const item = {_id};

        //modify request to type DELETE
        options.method = 'DELETE';

        options = { ...options,
            body: JSON.stringify(item)
        };
        console.log(options);
        fetch(`${SERVER_URL}/item`, options)
        .then(response => response.json())
        .then(data => console.log(data));
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '1200px',
        height: 'auto',
        overflow: 'scroll'
    };

    return (
        <div className='create' style={myComponent}>
            <h1>Modify An Item</h1>
            <form onSubmit={handleModify}>
                <label>Modify Item id = {_id}</label>
                <textarea
                    required 
                    value={ description }
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label>Status :</label>
                <textarea
                    required 
                    value={ status }
                    onChange={(e) => setStatus(e.target.value)}
                ></textarea>
                {!isPending && <button>Modify Item</button>}
                {isPending && <button disabled>Modfying Item</button>}
            </form>
            <button onClick={() => handleDelete()}>Delete</button>
        </div>
    );
}

export default ItemEditForm;