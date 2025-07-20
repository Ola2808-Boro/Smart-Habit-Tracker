import {
  StyledWrapper,
  StyledDateRange,
  StyledWeekControls,
} from "./WeekSelector.syles";

import Icon from "../Icon/Icon";

const WeekSelector = ({
  startDate,
  endDate,
  handlePrevWeek,
  handleNextWeek,
}) => {
  return (
    <StyledWrapper>
      <StyledWeekControls>
        <Icon type="left-arrow" handleChangeDate={handlePrevWeek} />
        <StyledDateRange>
          {startDate.format("D MMM YYYY")} – {endDate.format("D MMM YYYY")}
        </StyledDateRange>
        <Icon type="right-arrow" handleChangeDate={handleNextWeek} />
      </StyledWeekControls>
    </StyledWrapper>
  );
};

export default WeekSelector;
