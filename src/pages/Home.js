import "../App.css";
import { Container } from "react-bootstrap";
import BlogViewList from "../components/BlogViewList";
import useFetch from "../components/useFetch";
import { useContext, useMemo } from "react";
import DataContext from "../context/DataContext";
import { useAuthContext } from "../hooks/useAuthContext";
import home from '../images/home.jpg';                // image by freepix

function Home() {
    // from  the data context
    const { SERVER_URL } = useContext(DataContext);
    const { user } = useAuthContext();

    // see if there is an authorized user
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
    } = useFetch(`${SERVER_URL}/noauth/blogall`, options);

    return (
        <div className="home container square border border-info border-2" style={{backgroundImage:`url(${home})`}} >
            <h1>Home Page</h1>
                <div></div>
                <Container>
                    <div className = 'text-start'>
                        {error && <div>{error} </div>}
                        {isPending && <div style={{ color: 'white', background: 'red' }}>LOADING ...</div>}
                        {blogs && <BlogViewList blogs={blogs} title="Home Page" />}
                    </div>
                </Container>
        </div>
    );
}

export default Home;
