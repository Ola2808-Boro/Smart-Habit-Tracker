// import {} from "./WeaklyStats.syles";
import BarChart from "../../atoms/BarChart/BarChart";
import WeekSelector from "../../atoms/WeekSelector/WeekSelector";
import MoodTypes from "../../molecules/MoodTypes/MoodTypes";
import StyledStatsContainer from "./WeaklyStats.styles";
import VisibleMore from "../VisibleMore/VisibleMore";
const WeaklyStats = ({
  weaklyStats,
  startDate,
  endDate,
  handleNextWeek,
  handlePrevWeek,
  moodOptions,
  visibleLegendOptions,
  setVisible,
}) => {
  return (
    <StyledStatsContainer>
      <WeekSelector
        startDate={startDate}
        endDate={endDate}
        handleNextWeek={handleNextWeek}
        handlePrevWeek={handlePrevWeek}
      />
      <BarChart text="Weakly statistics" data={weaklyStats} fixedYAxis={true} />
      <MoodTypes
        moodOptions={moodOptions}
        visibleLegendOptions={visibleLegendOptions}
      />
      <VisibleMore
        setVisible={setVisible}
        retrievedData={moodOptions}
        visible={visibleLegendOptions}
      />
    </StyledStatsContainer>
  );
};

export default WeaklyStats;
