import { Link, Outlet } from 'react-router-dom';
import {useState} from 'react';
import {
  NODE_API_END_POINT,
} from '../CommonUtils/Constants';
import { LOGOUT_MEETING } from '../CommonUtils/ApiConstant';
import './Layout.css';

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] =  useState(() => sessionStorage.getItem('zoomToken'));
  const handleLogout = (event) => {
    event.preventDefault();
    const zoomToken = sessionStorage.getItem('zoomToken');
    fetch(`${NODE_API_END_POINT}${LOGOUT_MEETING}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: zoomToken,
      }
    })
      .then((res) => res.json())
      .then((response) => {
        sessionStorage.clear();
        setIsLoggedIn(false);
        //Use useHistory hook here.  
        window.location.href = '/';
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Meeting list</Link>
          </li>
          <li>
            <Link to="/scheduleMeeting">Schedule a meeting</Link>
          </li>
          <li>
            <Link to="/joinMeeting">Join meeting</Link>
          </li>
          <li>
          </li>
        </ul>
        <Link to="/">
            {isLoggedIn ? <a href="some-page" onClick={handleLogout}>Logout</a>:<a href="some-page" onClick={handleLogout}>Login</a> }
          </Link>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
