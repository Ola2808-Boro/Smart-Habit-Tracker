import PropTypes from "prop-types";
import { StyledParagraph } from "./Paragraph.styles";

// Paragraph component renders a styled text block with customizable styles
const Paragraph = ({ text, fontSize, color, fontWeight, align, checked }) => {
  return (
    <StyledParagraph
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
// Default props for the Paragraph component
Paragraph.defaultProps = {
  text: "Text",
  fontSize: "16px",
  fontWeight: "bold",
  align: "self-start",
  checked: false,
  color: "black",
};

Paragraph.propTypes = {
  fontSize: PropTypes.string,
  text: PropTypes.string.isRequired,
  fontWeight: PropTypes.string,
  align: PropTypes.string,
  checked: PropTypes.bool.isRequired,
};

export default Paragraph;
