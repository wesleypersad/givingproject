import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function ItemAddForm() {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    const [description, setDescription] = useState();
    const [isPending, setIsPending]= useState(false);

    // if there is an authorized user set the fetch options
    if (user) {
        options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                // definately needed for body to be passed in fetch
                'Content-type' : 'application/json'
            }
        };
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const item = { description };
        //console.log(JSON.stringify(item));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(item)
        };

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
        <div className='create' style={myComponent}>
            <h1>Add A New Item</h1>
                <form onSubmit={handleCreate}>
                    <label>Create Item :</label>
                    <textarea
                        required 
                        value={ description }
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {!isPending && <button>Add item</button>}
                    {isPending && <button disabled>Adding item</button>}
                </form>
        </div>
    );
}

export default ItemAddForm;