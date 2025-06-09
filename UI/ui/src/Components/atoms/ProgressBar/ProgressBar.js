import PropTypes from "prop-types";
import {
  StyledProgressBar,
  StyledProgressBarContainer,
} from "./ProgressBar.styles";
// ProgressBar component displays a horizontal progress bar with given value and max
const ProgressBar = ({ value, max }) => {
  return (
    <StyledProgressBarContainer>
      <StyledProgressBar value={value} max={max} />
    </StyledProgressBarContainer>
  );
};
// Default props for ProgressBar
ProgressBar.defaultProps = {
  value: 0,
  max: 0,
};

// Prop type validation
ProgressBar.propTypes = {
  value: PropTypes.number.isRequired, // Current progress value
  max: PropTypes.number.isRequired, // Maximum progress value
};

export default ProgressBar;
