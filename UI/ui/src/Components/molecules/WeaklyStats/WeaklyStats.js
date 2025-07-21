// import {} from "./WeaklyStats.syles";
import BarChart from "../../atoms/BarChart/BarChart";
import WeekSelector from "../../atoms/WeekSelector/WeekSelector";
import MoodTypes from "../../molecules/MoodTypes/MoodTypes";

const WeaklyStats = ({
  weaklyStats,
  startDate,
  endDate,
  handleNextWeek,
  handlePrevWeek,
  moodOptions,
  visibleLegendOptions,
}) => {
  return (
    <>
      <WeekSelector
        startDate={startDate}
        endDate={endDate}
        handleNextWeek={handleNextWeek}
        handlePrevWeek={handlePrevWeek}
      />
      <MoodTypes
        moodOptions={moodOptions}
        visibleLegendOptions={visibleLegendOptions}
      />
      <BarChart text="Weakly statistics" data={weaklyStats} fixedYAxis={true} />
    </>
  );
};

export default WeaklyStats;
