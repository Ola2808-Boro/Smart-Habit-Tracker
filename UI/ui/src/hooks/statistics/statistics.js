import { useEffect } from "react";

export const useInitialData = (setCategoriesStatistics) => {
  useEffect(() => {
    const fetchData = async () => {
      await setCategoriesStatistics();
    };
    fetchData();
  }, []);
};
