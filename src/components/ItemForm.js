import { useState, useEffect, useMemo } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import useSessionStorage from '../customHooks/useSessionStorage';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

function ItemForm({ rowData, setItemList, sesStoreName='items' }) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    //test for rowData cotaining anything useful
    const isEmpty = rowData === null || rowData === undefined || Object.keys(rowData).length === 0;
    //initialise state variables 
    const [_id, setId] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [isPending, setIsPending]= useState(false);

    // use the session storage hook to store the user token
    const { deleteRecord, modifyRecord, addRecord } = useSessionStorage(sesStoreName);

    // if there is an authorized user set the fetch options
    let options = useMemo(() => {
        if (user) {
            return {
                //method: method,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    // definately needed for body to be passed in fetch
                    'Content-type' : 'application/json'
                }
            };
        };
        return {};
    }, [user]);

   // see if the rowData or empty status has changed
   useEffect(() => {
    if (!isEmpty) {
        setId(rowData._id);
        setDescription(rowData.description);
        setStatus(rowData.status);
        } else {
        setId('');
        setDescription('');
        setStatus('');
    }},[rowData, isEmpty]);

    // handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEmpty) {
            handleModify(e);
        } else {
            handleCreate(e);
        }
    };

    const handleCreate = (e) => {
        console.log('Handle Create Called');
        e.preventDefault();
        let item = { description, status};

        //modify request to type POST
        options.method = 'POST';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(item)
        };

        setIsPending(true);

        //add the user
        fetch(`${SERVER_URL}/item`, options)
        .then(response => response.json())
        .then(data => {
            console.log('new item added');
            setDescription('');
            setStatus('');
            setIsPending(false);
            //navigate('/donate');
            //window.location.reload();
            item = {...data};

            //add the item to the session storage and update the list
            const {recordData} = addRecord(item);
            setItemList(recordData);            
        });
    };

    const handleModify = (e) => {
        console.log('Handle Modify Called');
        e.preventDefault();
        const thisitem = { _id, description, status };
        
        //modify request to type PUT
        options.method = 'PUT';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(thisitem)
        };

        setIsPending(true);

        fetch(`${SERVER_URL}/item`, options)
        .then(() => {
            console.log('existing item modified');
            setDescription('');
            setStatus('');
            setIsPending(false);
            //navigate('/donate');
            //window.location.reload();
        });

        // modify the item from session storage and update the list
        const {recordData} = modifyRecord(thisitem);
        setItemList(recordData);
    };

    const handleDelete = (e) => {
        console.log('Handle Delete Called');
        // problem with useFetch hook so ordinary fetch used ?
        const thisitem = {_id};

        //modify request to type DELETE
        options.method = 'DELETE';

        options = { ...options,
            body: JSON.stringify(thisitem)
        };

        //delete the item
        fetch(`${SERVER_URL}/item`, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .then(() => {
            console.log('existing item deleted');
            setDescription('');
            setStatus('');
            setIsPending(false);
            //navigate('/donate');
            //window.location.reload();
        });

        // delete the item from session storage and update the list
        const {recordData} = deleteRecord(_id);
        setItemList(recordData);
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: 'auto',
        height: 'auto',
        overflow: 'scroll'
    };

    return (
        <div className='create' style={myComponent}>
            {!isEmpty ? <h1>Modify Item</h1> : <h1>Add An Item</h1>}
            <form className="p-3" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <textarea 
                        className="form-control" 
                        id="floatingTextarea"  
                        required 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea">Description:</label>
                </div>                
                {!isEmpty && 
                    <div className="form-floating mb-3">                        
                        <textarea
                            className="form-control" 
                            id="floatingTextarea"
                            required 
                            value={ status }
                            onChange={(e) => setStatus(e.target.value)}
                        ></textarea>
                        <label htmlFor="floatingTextarea">Status:</label>
                    </div>                    
                }
                <div className="d-flex justify-content-between">
                    {!isPending && 
                        (!isEmpty ? <button>Modify Item</button> : <button>Add Item</button>)
                    }
                    {isPending && 
                        (!isEmpty ? <button disabled>Modifying Item</button> : <button disabled>Adding Item</button>)
                    }
                    {!isEmpty && <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>}
                </div>
            </form>           
        </div>
    );
}

export default ItemForm;