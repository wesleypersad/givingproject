import { Link } from "react-router-dom";

const NotFound = () => {
    // this is a simple 404 page and console.log a message
    console.log('NOT FOUND !!!');

    return ( 
        <div className="not-found">
            <h2>Sorry</h2>
            <p>That Page Cannot Be found !!!</p>
            <Link to="/">Back to the homepage...</Link>
        </div>
    );
}

export default NotFound;