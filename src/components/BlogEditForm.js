import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function BlogEditForm({ rowData, setRowData }) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    const [title, setTitle] = useState(rowData.title);
    const [body, setBody] = useState(rowData.body);
    const [_id, setId] = useState(rowData._id);
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
        const blog = { _id, title, body };
        console.log(JSON.stringify(blog));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(blog)
        };

        setIsPending(true);

        fetch(`${SERVER_URL}/blog`, options)
        .then(() => {
            console.log('blog modified');
            setTitle('');
            setBody('');
            setIsPending(false);
            //navigate('/blog');
            window.location.reload();
        })
    };

    // add the _id to the body of the fetch options
    const handleDelete = async () => {
        // problem with useFetch hook so ordinary fetch used ?

        //modify request to type DELETE
        options.method = 'DELETE';

        options = { ...options,
            body: JSON.stringify({"_id": `${_id}`})
        };

        //console.log(options);
        fetch(`${SERVER_URL}/blog`, options)
        .then(response => response.json())
        .then(data => console.log(data));
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
            <h1>Modify Blog (HTML)</h1>
            <form onSubmit={handleModify}>
                <label>Modify Title:</label>
                <input 
                    type="text"
                    required 
                    value={ title }
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Body:</label>
                <textarea
                    className="form-control"
                    required
                    value={ body }
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                {!isPending && <button>Modify Blog</button>}
                {isPending && <button disabled>Adding Blog</button>}
            </form>
            <button onClick={() => handleDelete()}>Delete</button>
        </div>
    );
}

export default BlogEditForm;