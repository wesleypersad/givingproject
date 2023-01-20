import "../App.css";
//import { useState } from "react";
import BlogList from "../components/Bloglist";
import useFetch from "../components/useFetch";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from '../hooks/useAuthContext';

function Home() {
    // from  the data context
    const { BLOG_URL } = useContext(DataContext);
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
    const { data: blogs, isPending, error } = useFetch(`${BLOG_URL}`, options);

    return (
        <div className="home">
        {error && <div>{error} </div>}
        {isPending && <div>Loading ...</div>}
        {blogs && <BlogList blogs={blogs} title="Home Page" />}
        </div>
    );
}

export default Home;
