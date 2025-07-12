import PropTypes from "prop-types";
import { StyledMoodTrackerSelect } from "./MoodTrackerSelect.styles";
import Select from "../../atoms/Select/Select";
const MoodTrackerSelect = ({
  selectedMonth,
  setSelectedMonth,
  months,
  selectedYear,
  setSelectedYear,
  years,
}) => {
  return (
    <StyledMoodTrackerSelect>
      <Select
        defaultValue={selectedMonth}
        onChange={setSelectedMonth}
        values={months}
        key="month"
      />
      <Select
        defaultValue={selectedYear}
        onChange={setSelectedYear}
        values={years}
        key="year"
      />
    </StyledMoodTrackerSelect>
  );
};
// Default props for MoodTrackerSelect
MoodTrackerSelect.defaultProps = {};

// Prop types for MoodTrackerSelect
MoodTrackerSelect.propTypes = {
  selectedMonth: PropTypes.string,
  setSelectedMonth: PropTypes.func,
  months: PropTypes.array,
  selectedYear: PropTypes.number,
  setSelectedYear: PropTypes.func,
  years: PropTypes.array,
};

export default MoodTrackerSelect;
