import React from 'react';
import PropTypes from 'prop-types';
import { StyledCategory } from './Category.styles';

const Category = ({
  size,
  text,
  fontSize,
  color,
  backgroundColor,
  click,
}) => {
  return (
    <StyledCategory
      size={size}
      fontSize={fontSize}
      color={color}
      backgroundColor={backgroundColor}
      onClick={click}
    >
      {text}
    </StyledCategory>
  );
};

Category.defaultProps={
  size:'small',
  text:"Text",
  fontSize:"16px",
  type:"text",
  color:"black",
  backgroundColor:" #987afa",
  click:()=>{},
};

Category.propTypes = {
  /**size of button */
  size: PropTypes.string,
    /**font-size of text  in button */
  fontSize: PropTypes.string,
    /** text  in button */
  text: PropTypes.string.isRequired,
    /**color of text button */
  color: PropTypes.string,
   /**background-color of button */
  backgroundColor: PropTypes.string,
};

export default Category;