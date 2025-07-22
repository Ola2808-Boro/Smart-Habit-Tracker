import { useEffect, useState } from "react";
import "dayjs/locale/pl";
import dayjs from "dayjs";

export function useWeekSelector() {
  const [startDate, setStartDate] = useState(
    dayjs().startOf("week").add(1, "day")
  );
  const endDate = startDate.add(6, "day");

  const handlePrevWeek = () => {
    const newStart = startDate.subtract(7, "day");
    setStartDate(newStart);
  };

  const handleNextWeek = () => {
    const newStart = startDate.add(7, "day");
    setStartDate(newStart);
  };

  return {
    handleNextWeek,
    handlePrevWeek,
    endDate,
    startDate,
    setStartDate,
  };
}

export const useInitialData = (
  setCategoriesStatistics,
  setMoodStatistics,
  setWeaklyStatistics,
  setHabitStatistics
) => {
  useEffect(() => {
    const fetchData = async () => {
      await setCategoriesStatistics();
      await setMoodStatistics();
      await setWeaklyStatistics();
      await setHabitStatistics();
    };
    fetchData();
  }, []);
};

export const useWeaklyStats = (startDate, setWeaklyStatistics) => {
  useEffect(() => {
    const fetchData = async () => {
      await setWeaklyStatistics(startDate);
    };
    fetchData();
  }, [startDate]);
};
