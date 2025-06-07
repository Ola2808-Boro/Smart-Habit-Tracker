import React from "react";
import PropTypes from "prop-types";
import { StyledParagraph } from "./Paragraph.styles";

const Paragraph = ({
  size,
  text,
  fontSize,
  color,
  fontWeight,
  align,
  checked,
}) => {
  return (
    <StyledParagraph
      size={size}
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      align={align}
      checked={checked}
    >
      {text}
    </StyledParagraph>
  );
};

Paragraph.defaultProps = {
  size: "small",
  text: "Text",
  fontSize: "16px",
  fontWeight: "bold",
  align: "self-start",
};

Paragraph.propTypes = {
  /**size of button */
  size: PropTypes.string,
  /**font-size of text  in button */
  fontSize: PropTypes.string,
  /** text  in button */
  text: PropTypes.string.isRequired,

  fontWeight: PropTypes.string,

  align: PropTypes.string,
};

export default Paragraph;
