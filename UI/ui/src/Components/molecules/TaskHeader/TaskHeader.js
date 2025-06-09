import PropTypes from "prop-types";
import { StyledTaskHeader } from "./TaskHeader.styles";
import Input from "../../atoms/Input/Input";
import Paragraph from "../../atoms/Paragraph/Paragraph";
// TaskHeader component displays a habit with checkbox, label, and time input
const TaskHeader = ({ data, handleTimeChange, handleCheckBoxClick }) => {
  return (
    <StyledTaskHeader>
      {/* Checkbox input for task completion */}
      <Input
        type="checkbox"
        checked={data.done}
        data={data.task}
        onChange={handleCheckBoxClick}
      />
      {/* Task name */}
      <Paragraph text={data.task} checked={data.done} />
      {/* Time input to assign a specific time to a task */}
      <Input
        type="time"
        value={data.time || ""}
        data={data.task}
        onChange={(e) => handleTimeChange(data.task, e.target.value)}
      />
    </StyledTaskHeader>
  );
};

// Prop types for TaskHeader
TaskHeader.propTypes = {
  /** Object containing task data: name, time, done status */
  data: PropTypes.object.isRequired,
  /** Function triggered when checkbox is toggled */
  handleCheckBoxClick: PropTypes.func.isRequired,
  /** Function triggered when time input changes */
  handleTimeChange: PropTypes.func.isRequired,
};

export default TaskHeader;
