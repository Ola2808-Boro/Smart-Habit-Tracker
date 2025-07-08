import PropTypes from "prop-types";
import { StyledCategory } from "./Category.styles";

// Category component renders a styled category button
const Category = ({ text, fontSize, color, backgroundColor, click }) => {
  return (
    <StyledCategory
      fontSize={fontSize}
      color={color}
      backgroundColor={backgroundColor}
      onClick={click}
    >
      {text}
    </StyledCategory>
  );
};
// Default props for Category
Category.defaultProps = {
  text: "Text",
  fontSize: "16px",
  color: "black",
  backgroundColor: " #987afa",
  click: () => {},
};

// Prop types for Category
Category.propTypes = {
  /** Font size of the text */
  fontSize: PropTypes.string,
  /** Category name (text) */
  text: PropTypes.string.isRequired,
  /** Text color */
  color: PropTypes.string,
  /** Background color */
  backgroundColor: PropTypes.string,
  /** Click handler */
  click: PropTypes.func,
};

export default Category;
