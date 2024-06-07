import { useState, useEffect, useMemo } from 'react';
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import useSessionStorage from '../customHooks/useSessionStorage';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

function SkillForm({ rowData, setSkillList, sesStoreName = 'skills' }) {
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
    
    // use the session storage hook to store the user token
    const { deleteRecord, modifyRecord, addRecord } = useSessionStorage(sesStoreName);

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
        let skill = { skills, status};

        //modify request to type POST
        options.method = 'POST';

        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify(skill)
        };

        setIsPending(true);

        //add the user
        fetch(`${SERVER_URL}/skill`, options)
        .then(response => response.json())
        .then(data => {
            console.log('new skill added');
            setSkills('');
            setStatus('');
            setIsPending(false);
            //navigate('/donate');
            //window.location.reload();
            skill = {...data};

            //add the item to the session storage and update the list
            const {recordData} = addRecord(skill);
            setSkillList(recordData); 
        });
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
            //window.location.reload();
        });

        // modify the item from session storage and update the list
        const {recordData} = modifyRecord(thisskill);
        setSkillList(recordData);
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
            //window.location.reload();
        });
        
        // delete the item from session storage and update the list
        const {recordData} = deleteRecord(_id);
        setSkillList(recordData);
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
            <form className="p-3" onSubmit={handleSubmit}>
                <div  className="form-floating mb-3">
                   <textarea
                    className="form-control"
                    id="floatingTextarea"
                    required 
                    value={ skills }
                    onChange={(e) => setSkills(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea">Skills:</label>                
                </div>
                
                 
                {!isEmpty && 
                    <div className="form-floating mb-3">                        
                        <textarea
                            className="form-control" 
                            id="floatingTextarea"
                            required 
                            value={ status }
                            onChange={(e) => setStatus(e.target.value)}
                        ></textarea>
                        <label  htmlFor="floatingTextarea">Status:</label>
                    </div>   
                }
                <div className="d-flex justify-content-between">
                    {!isPending && 
                        (!isEmpty ? <button>Modify Skills</button> : <button>Add Skills</button>)
                    }
                    {isPending && 
                        (!isEmpty ? <button disabled>Modfying Skills</button> : <button disabled>Adding Skills</button>)
                    }
                    {!isEmpty && <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>}
                </div>    
                
            </form>
        </div>
    );
}

export default SkillForm;