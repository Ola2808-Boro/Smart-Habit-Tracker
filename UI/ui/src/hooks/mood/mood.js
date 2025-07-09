import { useState, useEffect } from "react";
import { months } from "../../utils/mood/mood";

export function useDate() {
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  );

  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState();

  console.log(selectedDay, selectedMonth, selectedYear);
  return {
    selectedMonth,
    setSelectedMonth,
    selectedDay,
    setSelectedDay,
    selectedYear,
    setSelectedYear,
    years,
    setYears,
  };
}

export function useMood() {
  const [selectedMoods, setSelectedMoods] = useState({});
  const [moodOptions, setMoodOptions] = useState([]);
  const [isMoodPopupOpen, setIsMoodPopupOpen] = useState(false);
  const [isAddMoodLegendOpen, setIsAddMoodLegendOpen] = useState(false);
  const [newMoodColor, setNewMoodColor] = useState("#aabbcc");
  const [newMoodName, setNewMoodName] = useState("");
  const [visibleLegendOptions, setVisibleLegendOptions] = useState(10);

  async function addMoodToLegend() {
    setIsAddMoodLegendOpen(false);
    setMoodOptions((prev) => [...prev, [newMoodName, newMoodColor]]);
    setNewMoodName("");
    setNewMoodColor("");
  }

  async function setInactiveMoodDays(
    currentDate,
    selectedYear,
    selectedMonth,
    totalDays
  ) {
    setSelectedMoods((prev) => {
      const newState = { ...prev };
      if (!newState[selectedYear]) newState[selectedYear] = {};
      if (!newState[selectedYear][selectedMonth])
        newState[selectedYear][selectedMonth] = {};
      for (let i = 1; i <= totalDays; i += 1) {
        if (!newState[selectedYear][selectedMonth][i] && i !== currentDate) {
          newState[selectedYear][selectedMonth][i] = {
            mood: "inactive",
            color: "gray",
          };
          console.log(newState[selectedYear][selectedMonth][i]);
        }
      }
      return newState;
    });
  }
  async function addMood(e, selectedYear, selectedMonth, selectedDay) {
    e.preventDefault();
    setSelectedMoods((prev) => {
      const newState = { ...prev };
      if (!newState[selectedYear]) newState[selectedYear] = {};
      if (!newState[selectedYear][selectedMonth])
        newState[selectedYear][selectedMonth] = {};
      newState[selectedYear][selectedMonth][selectedDay] = {
        mood: e.target.dataset.mood,
        color: e.target.dataset.color,
      };
      return newState;
    });
  }

  return {
    selectedMoods,
    setSelectedMoods,
    moodOptions,
    setMoodOptions,
    isMoodPopupOpen,
    setIsMoodPopupOpen,
    isAddMoodLegendOpen,
    setIsAddMoodLegendOpen,
    newMoodColor,
    setNewMoodColor,
    newMoodName,
    setNewMoodName,
    visibleLegendOptions,
    setVisibleLegendOptions,
    addMoodToLegend,
    setInactiveMoodDays,
    addMood,
  };
}

export const useInitialData = (
  getMoodLegend,
  getMood,
  setInactiveMoodDays,
  getJoinedDate,
  selectedYear,
  selectedMonth,
  totalDays
) => {
  useEffect(() => {
    const today = new Date().getDate();
    const fetchData = async () => {
      await getMoodLegend();
      await getMood();
      await setInactiveMoodDays(today, selectedYear, selectedMonth, totalDays);
      await getJoinedDate();
    };
    fetchData();
  }, []);
};

export const useNewMoodData = (
  getMood,
  setInactiveMoodDays,
  selectedMonth,
  selectedYear
) => {
  useEffect(() => {
    const today = new Date().getDate();
    const fetchData = async () => {
      await getMood();
      await setInactiveMoodDays(today);
    };

    fetchData();
  }, [selectedMonth, selectedYear]);
};
