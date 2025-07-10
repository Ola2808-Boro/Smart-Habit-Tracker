import PropTypes from "prop-types";
import {
  StyledMoodTrackerDayNamesContainer,
  StyledMoodTrackerDayName,
} from "./MoodTrackerDayNames.styles";

const MoodTrackerDayNames = ({ nameOfDays }) => {
  return (
    <StyledMoodTrackerDayNamesContainer>
      {nameOfDays &&
        nameOfDays.map((dayName, idx) => (
          <StyledMoodTrackerDayName key={idx}>
            {dayName}
          </StyledMoodTrackerDayName>
        ))}
    </StyledMoodTrackerDayNamesContainer>
  );
};
// Default props for MoodTrackerDayNames
MoodTrackerDayNames.defaultProps = {};

// Prop types for MoodTrackerDayNames
MoodTrackerDayNames.propTypes = {
  nameOfDays: PropTypes.array,
};

export default MoodTrackerDayNames;
