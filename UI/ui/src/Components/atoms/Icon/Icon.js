import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { StyledIcon } from "./Icon.styles";

// Icon component displays a left or right arrow depending on the "type" prop
const Icon = ({ type, handleChangeDate }) => {
  if (type === "left-arrow") {
    return (
      <StyledIcon data-arrow="left" onClick={(e) => handleChangeDate(e)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </StyledIcon>
    );
  } else if (type === "right-arrow") {
    return (
      <StyledIcon data-arrow="right" onClick={(e) => handleChangeDate(e)}>
        <FontAwesomeIcon icon={faArrowRight} />
      </StyledIcon>
    );
  }
};

Icon.propTypes = {
  type: PropTypes.string.isRequired, // "left-arrow" or "right-arrow"
  handleChangeDate: PropTypes.func.isRequired, // Function to handle date change
};

export default Icon;
