import { useEffect, useState, useMemo } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function BlogForm({ rowData }) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    //test for rowData cotaining anything useful
    const isEmpty = rowData === null || rowData === undefined || Object.keys(rowData).length === 0;

    //initialise state variables
    const [_id, setId] = useState('');
    const [title, setTitle] = useState(''); 
    const [body, setBody] = useState('');
    const [isPending, setIsPending]= useState(false);

    // see if there is an authorized user set the fetch options
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

    // seee if the rowData or empty status has changed
    useEffect(() => {
        if (!isEmpty) {
            setId(rowData._id);
            setTitle(rowData.title);
            setBody(rowData.body);
        } else {
            setId('');
            setTitle('');
            setBody('');
        }
    },[rowData, isEmpty]);
   
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
        e.preventDefault();
        const blog = { title, body };

        //modify request to type POST
        options.method = 'POST';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(blog)
        };

        setIsPending(true);

        //add the user
        fetch(`${SERVER_URL}/blog`, options)
        .then(() => {
            console.log('new blog added');
            setTitle('');
            setBody('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };  

    const handleModify = (e) => {
        e.preventDefault();
        const thisblog = { _id, title, body };

        //modify request to type PUT
        options.method = 'PUT';
        console.log(JSON.stringify(thisblog));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(thisblog)
        };

        setIsPending(true);

        //modify the blog
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

    const handleDelete = async () => {
        // problem with useFetch hook so ordinary fetch used ?
        const thisblog = {_id};
        //modify request to type DELETE
        options.method = 'DELETE';

        options = { ...options,
            body: JSON.stringify(thisblog)
        };

        //delete this blog
        fetch(`${SERVER_URL}/blog`, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .then(() => {
            console.log('blog deleted');
            setTitle('');
            setBody('');
            setIsPending(false);
            //navigate('/blog');
            window.location.reload();
        });
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
            {!isEmpty ? <h1>Modify Blog (HTML)</h1> : <h1>Add A Blog (HTML)</h1>}
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
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
                {!isPending &&
                    (!isEmpty ? <button>Modify Blog</button> : <button>Add Blog</button>)
                }
                {isPending && 
                    (!isEmpty ? <button disabled>Modifying Blog</button> : <button disabled>Adding Blog</button>)
                }
            </form>
            {!isEmpty && <button onClick={() => handleDelete()}>Delete</button>}
        </div>
    );
}

export default BlogForm;