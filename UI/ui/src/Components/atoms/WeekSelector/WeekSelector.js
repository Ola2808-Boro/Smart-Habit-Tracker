import {
  StyledWrapper,
  StyledDateRange,
  StyledLabel,
  StyledDatePickerWrapper,
  StyledWeekControls,
  StyledButton,
  StyledInput,
} from "./WeekSelector.syles";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import React, { useState } from "react";

const WeekSelector = ({ onWeekChange }) => {
  const [startDate, setStartDate] = useState(
    dayjs().startOf("week").add(1, "day")
  );

  const handlePrevWeek = () => {
    const newStart = startDate.subtract(7, "day");
    setStartDate(newStart);
    onWeekChange(newStart);
  };

  const handleNextWeek = () => {
    const newStart = startDate.add(7, "day");
    setStartDate(newStart);
    onWeekChange(newStart);
  };

  const handleDateChange = (e) => {
    const selected = dayjs(e.target.value).startOf("week").add(1, "day");
    setStartDate(selected);
    onWeekChange(selected);
  };

  const endDate = startDate.add(6, "day");

  return (
    <StyledWrapper>
      <StyledWeekControls>
        <StyledButton onClick={handlePrevWeek}>← Last week</StyledButton>
        <StyledDateRange>
          {startDate.format("D MMM YYYY")} – {endDate.format("D MMM YYYY")}
        </StyledDateRange>
        <StyledButton onClick={handleNextWeek}>Next week →</StyledButton>
      </StyledWeekControls>

      <StyledDatePickerWrapper>
        <StyledLabel>
          Choose date:
          <StyledInput
            type="date"
            value={startDate.format("YYYY-MM-DD")}
            onChange={handleDateChange}
          />
        </StyledLabel>
      </StyledDatePickerWrapper>
    </StyledWrapper>
  );
};

export default WeekSelector;
