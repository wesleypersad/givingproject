import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function UserEditForm({rowData, setRowData}) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    console.log('EDIT FORM=', rowData);

    const [_id, setId] = useState(rowData._id);
    const [username, setUsername] = useState(rowData.username);
    const [password, setPassword] = useState(rowData.password);
    const [email, setEmail] = useState(rowData.email);
    const [mobile, setMobile] = useState(rowData.mobile);
    const [role, setRole] = useState(rowData.role);
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
            <h1>Modify User</h1>
            <form onSubmit={handleModify}>
                <label>Modify Username:</label>
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
                {!isPending && <button>Modify user</button>}
                {isPending && <button disabled>Modfying user</button>}
            </form>
            <button onClick={() => handleDelete()}>Delete</button>
        </div>
    );
}

export default UserEditForm;