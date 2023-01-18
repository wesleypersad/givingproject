import "../App.css";
//import { useState } from "react";
import BlogList from "../components/Bloglist";
import useFetch from "../components/useFetch";
import BlogForm from "../components/BlogForm";
import { useContext } from "react";
import DataContext from "../context/DataContext";

function Blog() {
    // from  the data context
    const { BLOG_URL } = useContext(DataContext);

    // request the blog data
    const { data: blogs, isPending, error } = useFetch(`${BLOG_URL}`);

    return (
        <div className="blog">
        {error && <div>{error} </div>}
        {isPending && <div>Loading ...</div>}
        {blogs && <BlogList blogs={blogs} title="Read/Create Blogs" />}
        <BlogForm />
        </div>
    );
}

export default Blog;
