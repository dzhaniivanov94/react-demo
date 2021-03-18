import { NavLink } from 'react-router-dom';
const CategoryNavigation = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><NavLink activeClassName="nav-link-selected" to="/categories/all">All</NavLink></li>
                <li><a href="#">Cats</a></li>
                <li><a href="#">Dogs</a></li>
                <li><a href="#">Parrots</a></li>
                <li><a href="#">Reptiles</a></li>
                <li><a href="#">Other</a></li>
            </ul>
        </nav>
    )
}

export default CategoryNavigation;