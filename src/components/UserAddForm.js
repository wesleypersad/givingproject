import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function UserAddForm() {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [role, setRole] = useState();
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

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: 'auto',
        height: 'auto',
        overflow: 'scroll'
    };

    return (
        <div className='create' style={myComponent}>
            <h1>Add A User</h1>
                <form onSubmit={handleCreate}>
                    <label>Create user :</label>
                    <label>Username :</label>
                    <textarea
                        required 
                        value={ username }
                        onChange={(e) => setUsername(e.target.value)}
                    ></textarea>
                    <label>Password :</label>
                    <textarea
                        required 
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)}
                    ></textarea>
                    <label>Email :</label>
                    <textarea
                        required 
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)}
                    ></textarea>
                    <label>Mobile :</label>
                    <textarea
                        required 
                        value={ mobile }
                        onChange={(e) => setMobile(e.target.value)}
                    ></textarea>
                    <label>Role :</label>
                    <textarea
                        required 
                        value={ role }
                        onChange={(e) => setRole(e.target.value)}
                    ></textarea>
                    {!isPending && <button>Add user</button>}
                    {isPending && <button disabled>Adding user</button>}
                </form>
        </div>
    );
}

export default UserAddForm;