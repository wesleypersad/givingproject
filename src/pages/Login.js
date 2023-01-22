import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from '../hooks/useLogin';

function Login() {
    // username amd password only required for login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(username, password);
        //console.log(username, password);
        navigate('/');
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Username:</label>
            <input 
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label>Password:</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login;