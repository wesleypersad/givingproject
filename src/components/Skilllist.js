import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';

const  SkillList= ({skills}) => {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    const title = 'List Of skills';
    let options = {};

    // if there is an authorized user set the fetch options
    if (user) {
        options = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                // definately needed for body to be passed in fetch
                'Content-type' : 'application/json'
            }
        };
    };

    // add the _id to the body of the fetch options
    const handleClick = async (_id) => {
        // problem with useFetch hook so ordinary fetch used ?
        options = { ...options,
            body: JSON.stringify({"_id": `${_id}`})
        };
        console.log(options);
        fetch(`${SERVER_URL}/skill`, options)
        .then(response => response.json())
        .then(data => console.log(data));
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '1200px',
        height: '200px',
        overflow: 'scroll'
    };

    return (
        <div className="skill-list">
            <h2>{ title }</h2>
            {skills.map((skill) => (
                <div className="skill-details" key={skill._id} style={myComponent}>
                    <div>
                        <h2>{ skill.skills }</h2>
                        <p>Donated by <strong>{skill.donerid}</strong></p>
                    </div>
                    <span onClick={() => handleClick(skill._id)}>Delete</span>
                </div>
            ))}
        </div>
    );
}

export default SkillList;