import PropTypes from "prop-types";
import { StyledCalendarContainer } from "./CalendarSectionstyles";
import QuestionAndAnswer from "../../molecules/QuestionAndAnswer/QuestionAndAnswer";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

export const CalendarSection = ({
  onChange,
  calDate,
  handleClosePopupAddQuestion,
  handleOpenPopupQandA,
}) => {
  return (
    <StyledCalendarContainer>
      <Calendar onChange={onChange} value={calDate} selectRange={true} />
      <QuestionAndAnswer
        handleOpenPopupQandA={handleOpenPopupQandA}
        handleOpenPopupAddQuestion={handleClosePopupAddQuestion}
      />
    </StyledCalendarContainer>
  );
};

CalendarSection.propTypes = {};

export default CalendarSection;
