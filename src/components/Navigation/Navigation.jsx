import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
const Navigation = () => (
  <nav>
    <NavLink
      //   exact
      to="/"
      className={navData => (navData.isActive ? s.activeLink : s.link)}
    >
      Home
    </NavLink>
    <NavLink
      to="/movies"
      className={navData => (navData.isActive ? s.activeLink : s.link)}
    >
      Movies
    </NavLink>
  </nav>
);
export default Navigation;
