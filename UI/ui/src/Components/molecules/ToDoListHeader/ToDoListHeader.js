import PropTypes from "prop-types";
import { StyledToDoListHeader } from "./ToDoListHeader.styles";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import Icon from "../../atoms/Icon/Icon";
// ToDoListHeader component shows current date and navigation arrows
const ToDoListHeader = ({ date, handleChangeDate }) => {
  return (
    <StyledToDoListHeader>
      {/* Left arrow to go to previous date */}
      <Icon type="left-arrow" handleChangeDate={handleChangeDate} />
      {/* Current date */}
      <Paragraph text={date} fontSize="20px" />
      {/* Right arrow to go to next date */}
      <Icon type="right-arrow" handleChangeDate={handleChangeDate} />
    </StyledToDoListHeader>
  );
};

// Prop types for ToDoListHeader
ToDoListHeader.propTypes = {
  /** Date string to display */
  date: PropTypes.string.isRequired,
  /** Function to change date when arrow is clicked */
  handleChangeDate: PropTypes.func.isRequired,
};

export default ToDoListHeader;
