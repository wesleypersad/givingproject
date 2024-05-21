import { useEffect, useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

    
function UserForm( {rowData} ) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    //test for rowData cotaining anything useful
    const isEmpty = rowData === null || rowData === undefined || Object.keys(rowData).length === 0;

    const [_id, setId] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [role, setRole] = useState(null);
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

    useEffect(() => {
        const isEmpty = rowData === null || rowData === undefined || Object.keys(rowData).length === 0;
        setId(!isEmpty ? rowData._id : null);
        setUsername(!isEmpty ? rowData.username : null);
        setPassword(!isEmpty ? rowData.password : null);
        setEmail(!isEmpty ? rowData.email : null);
        setMobile(!isEmpty ? rowData.mobile : null);
        setRole(!isEmpty ? rowData.role : null);
    },[rowData]);

    const handleCreate = (e) => {
        e.preventDefault();
        const user = { username, password, email, mobile, role };
        //console.log(JSON.stringify(user));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(user)
        };

        setIsPending(true);

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
            window.location.reload();
        })
    };

    const handleModify = (e) => {
        e.preventDefault();
        const thisuser = { _id, username, password, email, mobile, role };
        //console.log(JSON.stringify(thisuser));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(thisuser)
        };

        console.log(options);

        setIsPending(true);

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
            window.location.reload();
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
        console.log(options);
        fetch(`${SERVER_URL}/user`, options)
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
            {!isEmpty ? <h1>Modify User</h1> : <h1>Add A User</h1>}
            <form onSubmit={handleModify}>
                <label>Username:</label>
                <textarea
                    required 
                    value={ username }
                    onChange={(e) => setUsername(e.target.value)}
                ></textarea>
                <label>Password:</label>
                <textarea
                    required 
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                ></textarea>
                <label>Email:</label>
                <textarea
                    required 
                    value={ email }
                    onChange={(e) => setEmail(e.target.value)}
                ></textarea>
                <label>Mobile:</label>
                <textarea
                    required 
                    value={ mobile }
                    onChange={(e) => setMobile(e.target.value)}
                ></textarea>
                <label>Role:</label>
                <textarea
                    required 
                    value={ role }
                    onChange={(e) => setRole(e.target.value)}
                ></textarea>
                {!isPending && 
                    (!isEmpty ? <button>Modify user</button> : <button>Add user</button>)
                }
                {isPending && 
                    (!isEmpty ? <button disabled>Modfying user</button> : <button disabled>Adding user</button>)
                }
            </form>
            {!isEmpty && <button onClick={() => handleDelete()}>Delete</button>}
        </div>
    );
}

export default UserForm;