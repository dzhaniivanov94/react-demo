import { Link } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import { useContext, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';


const Header = () => {
    const { isAuthenticated, username } = useContext(AuthContext);
    useEffect(() => {
        if (!isAuthenticated) {
            return
        }
        auth.currentUser.getIdToken()
            .then(function (idToken) {
                return fetch('http://localhost:5001', {
                    headers: {
                        'Authorization': idToken
                    }
                })

            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }, [isAuthenticated])
    return (
        <header id="site-header">
            <nav className="navbar">
                <section className="navbar-dashboard">
                    <div className="first-bar">
                        <Link to="/">Dashboard</Link>
                        <Link className="button" to="/pets">My Pets</Link>
                        <Link className="button" to="/pets/create">Add Pet</Link>
                    </div>
                    <div className="second-bar">
                        <ul>
                            {
                                isAuthenticated
                                    ? <li>Welcome, {username}!</li>
                                    : <li>Welcome guest</li>
                            }

                            <li> <Link to="/logout"><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
                        </ul>
                    </div>
                </section>
                <section className="navbar-anonymous">
                    <ul>
                        <li><Link to="/register"><i className="fas fa-user-plus"></i> Register</Link></li>
                        <li> <Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
                    </ul>
                </section>
            </nav>
        </header>
    )
}

export default Header;

