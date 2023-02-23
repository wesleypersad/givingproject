import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    // set the admin flag to allow display of admin page
    const admin = (!user) ? false : ((user.role !== 'admin') ? false : true);

    return (
        <header>
            <div className="container square border border-info border-5">
                <h1>React Giving Website : </h1>

                <div className='links'>
                    <Link to='/'>Home </Link>
                </div>
                {user && (
                <div className='links'>
                    <Link to='/blog'>Blog </Link>
                    <Link to='/chat'>Chat </Link>
                    <Link to='/donate'>Donate </Link>
                    <Link to='/booking'>Booking </Link>
                    <Link to='/textsms'>Textsms </Link>
                    <Link to='/research'>Research </Link>
                </div>
                )}
                {(admin) && (
                <div className='links'>
                    <Link to='/admin'>Admin </Link>
                </div>
                )}
                {!user && (
                    <div className='links'>
                        <Link to='/signup'>Signup </Link>
                        <Link to='/login'>Login </Link>
                    </div>
                )}
                {user && (
                    <div>
                        <button onClick={handleClick}>Log out</button>
                        <span>{user.username} </span>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar;