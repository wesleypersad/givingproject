import "../App.css";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../components/BlogList";
import useFetch from "../components/useFetch";
import BlogAddForm from "../components/BlogAddForm";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from "../hooks/useAuthContext";
import blog from '../images/blog.jpg';                // image by freepix

function Blog() {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    // see if there is an authorized user also put the user in the body 
    // to ensure we can filter the blog results as authorisation no loger required
    const options = useMemo(() => {
        if (user) {
            return {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };
        };
        return {};
    }, [user]);

    // request the blog data
    const {
        data: blogs,
        isPending,
        error,
    } = useFetch(`${SERVER_URL}/blog`, options);

    return (
        <div className="blog container square border border-info border-2" style={{backgroundImage:`url(${blog})`}} >
        <h1>Blog Page</h1>
        <Container>
            {error && <div>{error} </div>}
            {isPending && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
            {blogs && <BlogList blogs={blogs} title="Read/Create Blogs" />}
        </Container>
        <Container>
            <BlogAddForm />
        </Container>
        </div>
    );
}

export default Blog;
