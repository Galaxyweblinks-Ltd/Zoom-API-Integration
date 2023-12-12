import React, { useState } from 'react';
import Button from '../../shared/components/Button/Button.js';
import { getAuthorizeUrl } from '../../shared/utils/utils';
import './Login.css';
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLoginClick = () => {
    setIsLoading(true);
    getAuthorizeUrl();
  };

  return (
    <div className="not-logged-in">
      <p>Please log in to access Zoom features.</p>
      <div>
        <Button
          handleClick={handleLoginClick}
          isLoading={isLoading}
          btnTxt="Log in"
          className={isLoading ? 'disabled' : ''}
        />
        {isLoading ? 'Loading...' : null}
      </div>
    </div>
  );
};

export default Login;
Login.defaultProps = {};

Login.propTypes = {};
