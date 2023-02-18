import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function SkillActionForm({rowData, setRowData}) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    console.log('ACTION FORM=', rowData);

    const [_id, setId] = useState(rowData._id);
    const [skills, setSkills] = useState(rowData.skills);
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

    const handleAction = (e) => {
        e.preventDefault();
        const skill = { _id, skills };
        //console.log(JSON.stringify(skill));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(skill)
        };

        console.log(options);

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
        <div className='action' style={myComponent}>
            <h1>Action Skill</h1>
            <form onSubmit={handleAction}>
                <label>Modify Skill id = {_id}</label>
                <label>Skills :</label>
                <textarea
                    required 
                    value={ skills }
                    // onChange={(e) => setAmount(e.target.value)}
                ></textarea>
                {!isPending && <button>Action Skill</button>}
                {isPending && <button disabled>Actioning Skill</button>}
            </form>
        </div>
    );
}

export default SkillActionForm;