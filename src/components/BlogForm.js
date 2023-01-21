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
    const [author, setAuthor] = useState('wesley');
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
        const blog = { title, body, author };
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
            setAuthor('wesley');
            setIsPending(false);
            //navigate('/blog');
            window.location.reload();
        })
    };

    return (
        <div className='create'>
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
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange= {(e) => setAuthor(e.target.value)}
                >
                    <option value="wesley">wesley</option>
                    <option value="omattie">omattie</option>
                    <option value="harish">harish</option>
                    <option value="sunita">sunita</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog</button>}
            </form>
        </div>
    );
}

export default BlogForm;