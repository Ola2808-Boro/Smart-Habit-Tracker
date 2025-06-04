import React from 'react';
import PropTypes from 'prop-types';
import { StyledInput } from './Input.styles';

const Input = ({
  size,
  text,
  fontSize,
  type,
  color,
  onChange,
  data,
  checked,
  value
}) => {
  return (
    <StyledInput
      size={size}
      fontSize={fontSize}
      type={type}
      color={color}
      onChange={onChange}
      data={data}
      checked={checked}
      value={value}
    >
      {text}
    </StyledInput>
  );
};

Input.defaultProps={
  size:'small',
  text:"Text",
  fontSize:"16px",
  type:"text",
  color:"black",
  click:()=>{},
};

Input.propTypes = {

};

export default Input;