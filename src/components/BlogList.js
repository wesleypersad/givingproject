import { useContext } from "react";
import { useState } from "react";
import parse from 'html-react-parser';
import BlogEditForm from "./BlogEditForm";

const  BlogList= ({blogs}) => {
    // store edit status
    const [edit, setEdit] = useState(false);

    // toggle the edit flag
    const handleEdit = () => {
        setEdit(!edit);
        console.log(edit);
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
            <h2>List Of Blogs To View/Edit/Create</h2>
            {blogs.map((blog) => (
                <div className="blog-details text-start" key={blog._id} style={myComponent}>
                    <h1>{blog.title}</h1>
                    <h3>{blog.author}</h3>
                    <h3>{blog.created}</h3>
                    <div>
                        {parse(blog.body)}
                    </div>
                    <button onClick={() => handleEdit()}>Hide/Unhide Edit</button>
                    {edit && <div><BlogEditForm rowData={blog} /></div>}
                </div>
            ))}
        </div>
    );
}

export default BlogList;
