import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import 'bootstrap/dist/css/bootstrap.css';

function Signup() {
    // username, password and email all required for signup
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const {signup, error, isLoading} = useSignup();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(username, password, email, mobile);
        //console.log(username, password);
        navigate('/');
    };

    return (
        <form className="signup p-3" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">        
                <h1>Signup Page</h1>
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
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="floatingTextarea3" 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <label htmlFor="floatingTextarea3">Email:</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="floatingTextarea4"
                        type="mobile" 
                        onChange={(e) => setMobile(e.target.value)}
                        value={mobile}
                    />                  
                    <label htmlFor="floatingTextarea4">Mobile:</label>
                </div>
                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}        
            </div>
        </form>
    )
}

export default Signup;