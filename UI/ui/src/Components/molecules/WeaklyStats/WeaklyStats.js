// import {} from "./WeaklyStats.syles";
import BarChart from "../../atoms/BarChart/BarChart";
import WeekSelector from "../../atoms/WeekSelector/WeekSelector";

const WeaklyStats = ({
  weaklyStats,
  startDate,
  endDate,
  handleNextWeek,
  handlePrevWeek,
}) => {
  return (
    <>
      <WeekSelector
        startDate={startDate}
        endDate={endDate}
        handleNextWeek={handleNextWeek}
        handlePrevWeek={handlePrevWeek}
      />
      <BarChart text="Category frequency" data={weaklyStats} />
    </>
  );
};

export default WeaklyStats;
