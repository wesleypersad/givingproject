import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function BlogForm() {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    //const [author, setAuthor] = useState(`${user.username}`);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body };
        //console.log(JSON.stringify(blog));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(blog)
        };

        setIsPending(true);

        fetch(`${SERVER_URL}/blog`, options)
        .then(() => {
            console.log('new blog added');
            setTitle('');
            setBody('');
            setIsPending(false);
            //navigate('/blog');
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
            <h1>Add A New Blog</h1>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                    type="text"
                    required 
                    value={ title }
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={ body }
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog</button>}
            </form>
        </div>
    );
}

export default BlogForm;