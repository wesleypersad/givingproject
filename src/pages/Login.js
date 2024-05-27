import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from '../hooks/useLogin';
import 'bootstrap/dist/css/bootstrap.css';

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
        <form className="login p-3" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <h1>Login Page</h1>
                <div className="form-floating mb-3">
                    <input
                        className="form-control" 
                        id="floatingTextarea"
                        type="text" 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <label htmlFor="floatingTextarea">Username:</label>
                </div>
                <div className="form-floating mb-3"> 
                    <input
                        className="form-control"
                        id="floatingTextarea2" 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <label htmlFor="floatingTextarea2">Password:</label>
                </div>                
                <button disabled={isLoading}>Log in</button>
                {error && <div className="error">{error}</div>}
            </div>    
        </form>
    )
}

export default Login;