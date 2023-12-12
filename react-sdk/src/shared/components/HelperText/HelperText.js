import PropTypes from 'prop-types';
import React from 'react';

/**
 * @Component
 * @name HelperText
 * @desc Component that render the helping text.
 *
 * @param description - string that contains the helping text.
 */
const HelperText = ({ description }) => {
  return (
    <>
      <i className="helpText">{description}</i>
    </>
  );
};

export default HelperText;

Button.defaultProps = {
  description: '',
};

Button.propTypes = {
  description: PropTypes.string,
};
