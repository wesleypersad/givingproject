import { useContext } from "react";
import DataContext from "../context/DataContext";

const  BlogList= ({blogs, title}) => {
    // from  the data context
    const { DB_URL } = useContext(DataContext);

    // have to handle this for MongoDB !!!
    const handleClick = async (id) => {
        await fetch(`${DB_URL}/blogs/` + id, {
            method: 'DELETE'
        }).then(() => {
            //navigate('/blog');
            window.location.reload();
        })
    }

    return (
        <div className="blog-list">
            <h2>{ title }</h2>
            {blogs.map((blog) => (
                <div className="blog-details" key={blog.id}>
                    <div>
                        <h2>{ blog.title }</h2>
                        <p>Written by <strong>{blog.author}</strong></p>
                        <p><strong>{ blog.body }</strong></p>
                    </div>
                    <span onClick={() => handleClick(blog.id)}>Delete</span>
                </div>
            ))}
        </div>
    );
}

export default BlogList;