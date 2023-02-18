import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';
//import useFetch from "../components/useFetch";

const  BlogList= ({blogs}) => {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    const title = 'List Of Blogs';
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
        fetch(`${SERVER_URL}/blog`, options)
        .then(response => response.json())
        .then(data => console.log(data));
    };

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '90%',
        maxheight: '100px',
        overflow: 'scroll'
    };

    return (
        <div className="blog-list">
            <h2>{ title }</h2>
            {blogs.map((blog) => (
                <div className="blog-details" key={blog._id} style={myComponent}>
                    <div>
                        <h2>{ blog.title }</h2>
                        <p>Written by <strong>{blog.author}</strong></p>
                        <p><strong>{ blog.body }</strong></p>
                    </div>
                    <button onClick={() => handleClick(blog._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default BlogList;