import PropTypes from "prop-types";
import { StyledInput } from "./Input.styles.js";

// Input component renders a custom styled input field
const Input = ({ fontSize, type, color, onChange, data, checked, value }) => {
  return (
    <StyledInput
      fontSize={fontSize}
      type={type}
      color={color}
      onChange={onChange}
      data-task={data}
      checked={checked}
      value={value}
    ></StyledInput>
  );
};

// Default props for the Input component
Input.defaultProps = {
  text: "Text",
  fontSize: "16px",
  type: "text",
  color: "black",
  onChange: () => {},
};

Input.propTypes = {
  fontSize: PropTypes.string,
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  onChange: PropTypes.func,
  data: PropTypes.string,
  checked: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
