import PropTypes from 'prop-types';
import React from 'react';
import { noop } from '../../utils/utils';

/**
 * @Component
 * @name TextField
 * @desc Component that render the input box with label text.
 *
 * @param labelTitle - string
 * @param labelFor - string
 * @param type -string
 * @param id - string
 * @param placeHolder - string
 * @param value - string
 * @param name - string
 * @param onChange - function
 * @param isRequired - boolean
 */
const TextField = ({
  labelTitle,
  labelFor,
  type,
  id,
  placeHolder,
  value,
  name,
  onChange,
  isRequired,
}) => {
  return (
    <>
      <label for={labelFor}>{labelTitle}</label>
      <input
        type={type}
        id={id}
        placeholder={placeHolder}
        value={value}
        name={name}
        onChange={onChange}
        required={isRequired}
      />
    </>
  );
};

export default TextField;

TextField.defaultProps = {
  labelTitle: '',
  labelFor: '',
  type: 'text',
  id: '',
  placeHolder: '',
  value: '',
  name: '',
  onChange: noop,
  isRequired: false,
};

TextField.propTypes = {
  labelTitle: PropTypes.string,
  labelFor: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  isRequired: PropTypes.bool,
};
