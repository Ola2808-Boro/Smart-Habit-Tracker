import PropTypes from "prop-types";
import { StyledSelect } from "./Select.styles";

const Select = ({ defaultValue, onChange, values, key }) => {
  return (
    <StyledSelect
      value={defaultValue}
      onChange={(e) => onChange(e.target.value)}
      key={key}
    >
      {values &&
        values.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      /
    </StyledSelect>
  );
};
// Default props for Select
Select.defaultProps = {};

// Prop types for Select
Select.propTypes = {
  onChange: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string || PropTypes.number,
};

export default Select;
