import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function SkillForm() {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    const [skills, setSkills] = useState('');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const skill = { skills };
        //console.log(JSON.stringify(skill));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(skill)
        };

        setIsPending(true);

        fetch(`${SERVER_URL}/skill`, options)
        .then(() => {
            console.log('new skill added');
            setSkills('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '1200px',
        height: '200px',
        overflow: 'scroll'
    };

    return (
        <div className='create' style={myComponent}>
            <h1>Donate A New Skill</h1>
            <form onSubmit={handleSubmit}>
                <label>skill :</label>
                <textarea
                    required 
                    value={ skills }
                    onChange={(e) => setSkills(e.target.value)}
                ></textarea>
                {!isPending && <button>Add skill</button>}
                {isPending && <button disabled>Adding Skill</button>}
            </form>
        </div>
    );
}

export default SkillForm;