import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './Button.styles';

const Button = ({
  size,
  text,
  fontSize,
  type,
  color,
  backgroundColor,
  click,
}) => {
  return (
    <StyledButton
      size={size}
      fontSize={fontSize}
      type={type}
      color={color}
      backgroundColor={backgroundColor}
      onClick={click}
    >
      {text}
    </StyledButton>
  );
};

Button.defaultProps={
  size:'small',
  text:"Text",
  fontSize:"16px",
  type:"text",
  color:"white",
  backgroundColor:" #6366f1",
  click:()=>{},
};

Button.propTypes = {
  /**size of button */
  size: PropTypes.string,
    /**font-size of text  in button */
  fontSize: PropTypes.string,
    /** text  in button */
  text: PropTypes.string.isRequired,
  /**type of button */
  type: PropTypes.string.isRequired,
    /**color of text button */
  color: PropTypes.string,
   /**background-color of button */
  backgroundColor: PropTypes.string,
};

export default Button;