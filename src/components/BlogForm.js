import { useEffect, useState, useMemo } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import useSessionStorage from '../customHooks/useSessionStorage';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

function BlogForm({ rowData, setBlogList, sesStoreName = 'blogs' }) {
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
    // use the session storage hook to store the user token
    const { deleteRecord, modifyRecord, addRecord } = useSessionStorage(sesStoreName);

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

    // see if the rowData or empty status has changed
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
        let blog = { title, body };

        //modify request to type POST
        options.method = 'POST';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(blog)
        };

        setIsPending(true);

        //add the user
        fetch(`${SERVER_URL}/blog`, options)
        .then(response => response.json())
        .then(data => {
            console.log('new blog added');
            setTitle('');
            setBody('');
            setIsPending(false);
            //navigate('/donate');
            //window.location.reload();

            blog = {...data};

            //add the item to the session storage and update the list
            const {recordData} = addRecord(blog);
            setBlogList(recordData);
        });
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
            //window.location.reload();
        });

        // modify the item from session storage and update the list
        const {recordData} = modifyRecord(thisblog);
        setBlogList(recordData);    
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
            //window.location.reload();
        });

        // delete the item from session storage and update the list
        const {recordData} = deleteRecord(_id);
        setBlogList(recordData);
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
            <form className="p-3" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">                    
                    <input
                        className="form-control"
                        id="floatingTextarea"
                        type="text"
                        required 
                        value={ title }
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Title:</label>
                </div>                
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        id="floatingTextarea2"
                        required
                        value={ body }
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Body:</label>
                </div>                
                <div className="d-flex justify-content-between">
                    {!isPending &&
                        (!isEmpty ? <button>Modify Blog</button> : <button>Add Blog</button>)
                    }
                    {isPending && 
                        (!isEmpty ? <button disabled>Modifying Blog</button> : <button disabled>Adding Blog</button>)
                    }
                    {!isEmpty && <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>}
                </div>
            </form>    
        </div>
    );
}

export default BlogForm;