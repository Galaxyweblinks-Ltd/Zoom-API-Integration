import React, {useState} from 'react';
import './NotLoggedIn.css';
import { getAuthorizeUrl } from '../CommonUtils/CommonUtils';
const NotLoggedIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLoginClick = () => {
    setIsLoading(true);
    getAuthorizeUrl();
  };

  return (
    <div className="not-logged-in">
      <p>Please log in to access Zoom features.</p>
      <div>
        <button className={isLoading? 'disabled': ''} onClick={handleLoginClick} disabled={isLoading}>Log in</button>
        {isLoading?'Loading...': null}
      </div>
    </div>
  );
};

export default NotLoggedIn;
