import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LOGOUT_MEETING } from '../../constants/ApiConstant';
import { NODE_API_END_POINT } from '../../constants/Constants';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('zoomToken')
  );

  /**
   * @function
   * @name handleClick
   * @desc function that returns the login page after remove session storage.
   *
   * @param event - returns the event object.
   */
  const handleClick = async (event) => {
    event.preventDefault();
    const zoomToken = sessionStorage.getItem('zoomToken');

    fetch(`${NODE_API_END_POINT}${LOGOUT_MEETING}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: zoomToken,
      },
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
  };
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
          <li></li>
        </ul>
        <Link to="/">
          {isLoggedIn ? (
            <a href="some-page" onClick={handleClick}>
              Logout
            </a>
          ) : (
            <a href="some-page" onClick={handleClick}>
              Login
            </a>
          )}
        </Link>
      </nav>

      <Outlet />
    </>
  );
};

export default Header;

Header.defaultProps = {};

Header.propTypes = {};
