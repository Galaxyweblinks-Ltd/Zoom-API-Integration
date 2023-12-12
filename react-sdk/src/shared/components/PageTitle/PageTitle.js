import PropTypes from 'prop-types';
import React from 'react';
import './PageTitle.css';

/**
 * @Component
 * @name PageTitle
 * @desc Component that render the title for page.
 *
 * @param title - contains the title of the page.
 */
const PageTitle = ({ title }) => {
  return (
    <>
      <h2 className="meeting-header">{title}</h2>
    </>
  );
};

export default PageTitle;

Button.defaultProps = {
  title: '',
};

Button.propTypes = {
  title: PropTypes.string,
};
