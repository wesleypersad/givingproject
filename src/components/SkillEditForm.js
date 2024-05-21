import { useState } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function SkillEditForm({ rowData }) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    console.log('EDIT FORM=', rowData);

    const [_id, setId] = useState(rowData._id);
    const [skills, setSkills] = useState(rowData.skills);
    const [status, setStatus] = useState(rowData.status);
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
        const skill = { _id, skills };
        //console.log(JSON.stringify(skills));

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(skill)
        };

        console.log(options);

        setIsPending(true);

        fetch(`${SERVER_URL}/skill`, options)
        .then(() => {
            console.log('new skills added');
            setSkills('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };

    const handleDelete = (e) => {
        // problem with useFetch hook so ordinary fetch used ?
        const skills = {_id};

        //modify request to type DELETE
        options.method = 'DELETE';

        options = { ...options,
            body: JSON.stringify(skills)
        };
        console.log(options);
        fetch(`${SERVER_URL}/skill`, options)
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
            <h1>Modify Skills</h1>
            <form onSubmit={handleModify}>
                <label>Modify Skills</label>
                <textarea
                    className="form-control"
                    required
                    value={ skills }
                    onChange={(e) => setSkills(e.target.value)}
                ></textarea>
                <label>Status :</label>
                <textarea
                    required 
                    value={ status }
                    onChange={(e) => setStatus(e.target.value)}
                ></textarea>
                {!isPending && <button>Modify Skills</button>}
                {isPending && <button disabled>Modfying Skills</button>}
            </form>
            <button onClick={() => handleDelete()}>Delete</button>
        </div>
    );
}

export default SkillEditForm;