import PropTypes from 'prop-types';
import React from 'react';
import { noop } from '../../utils/utils';
import './Button.css';

/**
 * @Component
 * @name Button
 * @desc Component that render the button.
 *
 * @param handleClick - handle click event.
 * @param isLoading - boolean for click check.
 * @param btnTxt - string that contain button text.
 */
const Button = ({ handleClick, isLoading, btnTxt, className, type }) => {
  return (
    <>
      <button
        className={className}
        onClick={handleClick}
        disabled={isLoading}
        type={type}
      >
        {btnTxt}
      </button>
    </>
  );
};

export default Button;

Button.defaultProps = {
  handleClick: noop,
  isLoading: false,
  btnTxt: '',
  className: '',
  type: 'button',
};

Button.propTypes = {
  handleClick: PropTypes.func,
  isLoading: PropTypes.bool,
  btnTxt: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};
