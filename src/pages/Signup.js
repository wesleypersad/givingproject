import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

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
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
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
            <label>Email:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Mobile:</label>
            <input 
                type="mobile" 
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
            />
            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup;