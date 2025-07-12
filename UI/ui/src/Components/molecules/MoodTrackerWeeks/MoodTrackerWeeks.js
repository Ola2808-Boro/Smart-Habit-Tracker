import PropTypes from "prop-types";
import { StyledMoodTrackerWeeks } from "./MoodTrackerWeeks.styles";
import MoodTrackerDay from "../../atoms/MoodTrackerDay/MoodTrackerDay";
const MoodTrackerWeeks = ({
  weekChunks,
  selectedMoods,
  selectedYear,
  selectedMonth,
  setMoods,
}) => {
  return weekChunks.map((week, weekIndex) => (
    <StyledMoodTrackerWeeks key={weekIndex}>
      {week.map((day, dayIndex) => (
        <MoodTrackerDay
          key={dayIndex}
          day={day}
          backgroundColor={
            selectedMoods?.[selectedYear]?.[selectedMonth]?.[day]?.color
          }
          onClick={
            day === new Date().getDate() ? () => setMoods(day) : undefined
          }
        />
      ))}
    </StyledMoodTrackerWeeks>
  ));
};
// Default props for MoodTrackerWeeks
MoodTrackerWeeks.defaultProps = {};

// Prop types for MoodTrackerWeeks
MoodTrackerWeeks.propTypes = {};

export default MoodTrackerWeeks;
