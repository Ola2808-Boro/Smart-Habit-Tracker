import PropTypes from "prop-types";
import { StyledMoodTracker } from "./MoodTracker.styles";
import MoodTrackerWeeks from "../../molecules/MoodTrackerWeeks/MoodTrackerWeeks";
import MoodTrackerDayNames from "../../atoms/MoodTrackerDayNames/MoodTrackerDayNames";
import MoodTrackerSelect from "../../molecules/MoodTrackerSelect/MoodTrackerSelect";
const MoodTracker = ({
  selectedMonth,
  setSelectedMonth,
  months,
  selectedYear,
  setSelectedYear,
  years,
  nameOfDays,
  weekChunks,
  selectedMoods,
  setMoods,
}) => {
  return (
    <StyledMoodTracker>
      <MoodTrackerSelect
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        months={months}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        years={years}
      />
      <MoodTrackerDayNames nameOfDays={nameOfDays} />
      <MoodTrackerWeeks
        weekChunks={weekChunks}
        selectedMoods={selectedMoods}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        setMoods={setMoods}
      />
    </StyledMoodTracker>
  );
};
// Default props for MoodTracker
MoodTracker.defaultProps = {};

// Prop types for MoodTrackerDay
MoodTracker.propTypes = {};

export default MoodTracker;
