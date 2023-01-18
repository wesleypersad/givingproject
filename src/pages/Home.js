import "../App.css";
import { useState } from "react";
import BlogList from "../components/Bloglist";
import useFetch from "../components/useFetch";
import { useContext } from "react";
import DataContext from "../context/DataContext";

function Home() {
    // from  the data context
    const { BLOG_URL } = useContext(DataContext);

    // request the blog data
    const { data: blogs, isPending, error } = useFetch(`${BLOG_URL}`);

    return (
        <div className="home">
        {error && <div>{error} </div>}
        {isPending && <div>Loading ...</div>}
        {blogs && <BlogList blogs={blogs} title="Home Page" />}
        </div>
    );
}

export default Home;
