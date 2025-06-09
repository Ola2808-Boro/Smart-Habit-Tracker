import PropTypes from "prop-types";
import { StyledButton } from "./Button.styles";

// Button component renders a customizable styled button
const Button = ({ text, fontSize, type, color, backgroundColor, click }) => {
  return (
    <StyledButton
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
// Default props for Button
Button.defaultProps = {
  text: "Text",
  fontSize: "16px",
  color: "white",
  backgroundColor: " #6366f1",
  click: () => {},
};

// Prop types for Button
Button.propTypes = {
  /** Font size of the button text */
  fontSize: PropTypes.string,
  /** Button text */
  text: PropTypes.string.isRequired,
  /** Button type (e.g. "submit", "button") */
  type: PropTypes.string.isRequired,
  /** Text color */
  color: PropTypes.string,
  /** Background color */
  backgroundColor: PropTypes.string,
  /** Click handler */
  click: PropTypes.func,
};

export default Button;
