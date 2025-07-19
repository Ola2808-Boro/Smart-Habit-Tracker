import { useEffect } from "react";

export const useInitialData = (
  setCategoriesStatistics,
  setMoodStatistics,
  setWeaklyStatistics
) => {
  useEffect(() => {
    const fetchData = async () => {
      await setCategoriesStatistics();
      await setMoodStatistics();
      await setWeaklyStatistics();
    };
    fetchData();
  }, []);
};
