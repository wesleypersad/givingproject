import { useEffect, useState, useMemo } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
    
function UserForm( {rowData} ) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    //test for rowData cotaining anything useful
    const isEmpty = rowData === null || rowData === undefined || Object.keys(rowData).length === 0;

    //initialise state variables
    const [_id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [role, setRole] = useState('');
    const [isPending, setIsPending]= useState(false);

    // see if there is an authorized user
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
            setUsername(rowData.username);
            setPassword(rowData.password);
            setEmail(rowData.email);
            setMobile(rowData.mobile);
            setRole(rowData.role);
        } else {
            setId('');
            setUsername('');
            setPassword('');
            setEmail('');
            setMobile('');
            setRole('');
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
        const user = { username, password, email, mobile, role };

        //modify request to type POST
        options.method = 'POST';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(user)
        };

        setIsPending(true);

        //add the user
        fetch(`${SERVER_URL}/user`, options)
        .then(() => {
            console.log('new user added');
            setUsername('');
            setPassword('');
            setEmail('');
            setMobile('');
            setRole('');
            setIsPending(false);
            //navigate('/donate');
            //window.location.reload();
        })
    };

    const handleModify = (e) => {
        e.preventDefault();
        const thisuser = { _id, username, password, email, mobile, role };

        //modify request to type PUT
        options.method = 'PUT';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(thisuser)
        };

        setIsPending(true);

        //modify the user
        fetch(`${SERVER_URL}/user`, options)
        .then(() => {
            console.log('user modified');
            setUsername('');
            setPassword('');
            setEmail('');
            setMobile('');
            setRole('');
            setIsPending(false);
            //navigate('/donate');
            //window.location.reload();
        })
    };

    const handleDelete = (e) => {
        // problem with useFetch hook so ordinary fetch used ?
        const thisuser = {_id};

        //modify request to type DELETE
        options.method = 'DELETE';

        options = { ...options,
            body: JSON.stringify(thisuser)
        };

        //delete the user
        fetch(`${SERVER_URL}/user`, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .then(() => {
            console.log('user deleted');
            setUsername('');
            setPassword('');
            setEmail('');
            setMobile('');
            setRole('');
            setIsPending(false);
            //navigate('/donate');
            //window.location.reload();
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
            {!isEmpty ? <h1>Modify User</h1> : <h1>Add A User</h1>}
            <form className="p-3" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">                  
                    <textarea
                        className="form-control" 
                        id="floatingTextarea"
                        required 
                        value={ username }
                        onChange={(e) => setUsername(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea">Username:</label> 
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        id="floatingTextarea2"
                        required 
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Password:</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        id="floatingTextarea3"
                        required 
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea3">Email:</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        id="floatingTextarea4"
                        required 
                        value={ mobile }
                        onChange={(e) => setMobile(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea4">Mobile:</label>
                </div> 
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        id="floatingTextarea5"
                        required 
                        value={ role }
                        onChange={(e) => setRole(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea5">Role:</label>
                </div>                              
                <div className="d-flex justify-content-between">
                    {!isPending && 
                        (!isEmpty ? <button>Modify User</button> : <button>Add User</button>)
                    }
                    {isPending && 
                        (!isEmpty ? <button disabled>Modfying User</button> : <button disabled>Adding User</button>)
                    }
                    {!isEmpty && <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>} 
                </div>                
            </form>    
        </div>
    );
}

export default UserForm;