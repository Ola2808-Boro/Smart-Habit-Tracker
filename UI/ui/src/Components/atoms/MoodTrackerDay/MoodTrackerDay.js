import PropTypes from "prop-types";
import { StyledMoodTrackerDay } from "./MoodTrackerDay.styles";

const MoodTrackerDay = ({ index, day, onClick, backgroundColor }) => {
  return (
    <StyledMoodTrackerDay
      key={index}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {day ? day : ""}
    </StyledMoodTrackerDay>
  );
};
// Default props for MoodTrackerDay
MoodTrackerDay.defaultProps = {};

// Prop types for MoodTrackerDay
MoodTrackerDay.propTypes = {};

export default MoodTrackerDay;
