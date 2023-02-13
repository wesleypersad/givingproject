import "../App.css";
//import { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import BlogList from "../components/Bloglist";
import useFetch from "../components/useFetch";
import BlogForm from "../components/BlogForm";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';

function Blog() {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    // see if there is an authorized user
    if (user) {
        options = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        };
    };

    // request the blog data
    const { data: blogs, isPending, error } = useFetch(`${SERVER_URL}/blog`, options);

    return (
        <div className="blog">
            <h1>Blog Page</h1>
            <Container>
                {error && <div>{error} </div>}
                {isPending && <div>Loading ...</div>}
                {blogs && <BlogList blogs={blogs} title="Read/Create Blogs" />}                
            </Container>
            <Container>
                <BlogForm />
            </Container>
        </div>
    );
}

export default Blog;
