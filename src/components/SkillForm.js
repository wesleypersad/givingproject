import { useState, useEffect, useMemo } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import '../App.css';

function SkillForm({ rowData }) {
    // context provided variables
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    //test for rowData cotaining anything useful
    const isEmpty = rowData === null || rowData === undefined || Object.keys(rowData).length === 0;
    //initialise state variables 
    const [_id, setId] = useState('');
    const [skills, setSkills] = useState('');
    const [status, setStatus] = useState('');
    const [isPending, setIsPending]= useState(false);

    // if there is an authorized user set the fetch options
    let options = useMemo(() => {
        if (user) {
            return {
                //method: method,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    // definately needed for body to be passed in fetch
                    'Content-type' : 'application/json'
                }
            };
        };
        return {};
    }, [user]);

   // see if the rowData or empty status has changed
   useEffect(() => {
    if (!isEmpty) {
        setId(rowData._id);
        setSkills(rowData.skills);
        setStatus(rowData.status);
        } else {
        setId('');
        setSkills('');
        setStatus('');
    }
},[rowData, isEmpty]);

    // handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEmpty) {
            handleModify(e);
        } else {
            handleCreate(e);
        }
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const skill = { skills, status};

        //modify request to type POST
        options.method = 'POST';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(skill)
        };

        setIsPending(true);

        //add the user
        fetch(`${SERVER_URL}/skill`, options)
        .then(() => {
            console.log('new skill added');
            setSkills('');
            setStatus('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };

    const handleModify = (e) => {
        e.preventDefault();
        const thisskill = { _id, skills, status };
        //modify request to type PUT
        options.method = 'PUT';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(thisskill)
        };

        setIsPending(true);

        fetch(`${SERVER_URL}/skill`, options)
        .then(() => {
            console.log('new skill added');
            setSkills('');
            setStatus('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        })
    };

    const handleDelete = (e) => {
        // problem with useFetch hook so ordinary fetch used ?
        const thisskill = {_id};

        //modify request to type DELETE
        options.method = 'DELETE';

        options = { ...options,
            body: JSON.stringify(thisskill)
        };

        //delete the skill
        fetch(`${SERVER_URL}/skill`, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .then(() => {
            console.log('user deleted');
            setSkills('');
            setStatus('');
            setIsPending(false);
            //navigate('/donate');
            window.location.reload();
        });
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
            {!isEmpty ? <h1>Modify Skills</h1> : <h1>Add Skills</h1>}
            <form onSubmit={handleSubmit}>
                <label>Skills:</label>
                <textarea
                    className="form-control"
                    required 
                    value={ skills }
                    onChange={(e) => setSkills(e.target.value)}
                ></textarea>                
                {!isEmpty && 
                    <div>
                        <label>Status:</label>
                        <textarea
                            required 
                            value={ status }
                            onChange={(e) => setStatus(e.target.value)}
                        ></textarea>
                    </div>   
                }
                {!isPending && 
                    (!isEmpty ? <button>Modify Skills</button> : <button>Add Skills</button>)
                }
                {isPending && 
                    (!isEmpty ? <button disabled>Modfying Skills</button> : <button disabled>Adding Skills</button>)
                }
            </form>
            {!isEmpty && <button onClick={() => handleDelete()}>Delete</button>}
        </div>
    );
}

export default SkillForm;