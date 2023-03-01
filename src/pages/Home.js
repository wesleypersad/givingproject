import "../App.css";
//import { useState } from "react";
import { Container } from "react-bootstrap";
import BlogViewList from "../components/BlogViewList";
import useFetch from "../components/useFetch";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from "../hooks/useAuthContext";
import home from '../images/home.jpg';                // image by freepix

function Home() {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();
    let options = {};

    // see if there is an authorized user
    if (user) {
        options = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
        };
    };

    // request the blog data
    const {
        data: blogs,
        isPending,
        error,
    } = useFetch(`${SERVER_URL}/blog/all`, options);

    return (
        <div className="home container square border border-info border-2" style={{backgroundImage:`url(${home})`}} >
            <h1>Home Page</h1>
                <div></div>
                <Container>
                    <div className = 'text-start'>
                        {error && <div>{error} </div>}
                        {isPending && <div>Loading ...</div>}
                        {blogs && <BlogViewList blogs={blogs} title="Home Page" />}
                    </div>
                </Container>
            <div>
        </div>

        </div>
    );
}

export default Home;
