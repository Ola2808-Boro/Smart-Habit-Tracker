import "./Mood.css";
import PageTitle from "../../atoms/PageTitle/PageTitle";
import {
  getMoodLegendData,
  addNewMoodLegendData,
  getMoodData,
  updateMoodData,
  getJoinedDateData,
} from "../../../api/mood/mood";
import { useInitialData, useNewMoodData } from "../../../hooks/mood/mood";
import { months, daysInMonth, nameOfDays } from "../../../utils/mood/mood";
import { useDate, useMood } from "../../../hooks/mood/mood";
import Popup from "../../organisms/Popup/Popup.js";
import MoodLegend from "../../organisms/MoodLegend/MoodLegend.js";
import MoodTracker from "../../organisms/MoodTracker/MoodTracker.js";
const Mood = () => {
  const {
    selectedMonth,
    setSelectedMonth,
    selectedDay,
    setSelectedDay,
    selectedYear,
    setSelectedYear,
    years,
    setYears,
  } = useDate();
  const {
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
  } = useMood();

  const days = [];
  const weekChunks = [];
  const firstDay = new Date(selectedYear, new Date().getMonth()).getDay();
  const totalDays = daysInMonth(selectedYear, new Date().getMonth());

  async function getMoodLegend() {
    const response = await getMoodLegendData();
    console.log("getMoodLegend", response, response.data["mood"]);
    setMoodOptions(response.data["mood"]);
  }
  async function addMoodLegend(e) {
    setNewMoodColor();
    e.preventDefault();
    const response = addNewMoodLegendData(newMoodName, newMoodColor);
    addMoodToLegend();
  }
  async function handleOpenAddMoodLegendPopup() {
    console.log("handleOpenAddMoodLegendPopup");
    setIsAddMoodLegendOpen(true);
  }

  async function setMoods(day) {
    console.log("day", day);
    setSelectedDay(day);
    setIsMoodPopupOpen(true);
  }

  async function updateMood(e) {
    e.preventDefault();
    addMood(e, selectedYear, selectedMonth, selectedDay);
    const day = selectedDay;
    const mood = selectedMoods[selectedYear][selectedMonth][day].mood;
    const response = await updateMoodData(mood);
    setIsMoodPopupOpen(false);
    await getMood();
  }
  async function getJoinedDate() {
    const response = await getJoinedDateData();
    console.log("getJoinedDate", response);
    const dateJoinYear = new Date(response["data"]["date_join"]).getFullYear();
    const years = [];
    for (let i = selectedYear; i >= dateJoinYear; i -= 1) {
      years.push(i);
    }
    setYears(years);
  }

  async function getMood() {
    const response = await getMoodData();
    console.log("getMood", response.data["mood"]);
    const newMoods = { ...selectedMoods };

    response.data["mood"]?.forEach(([mood_id, dateStr, mood, color]) => {
      const date = new Date(dateStr);
      const y = date.getFullYear();
      const m = months[date.getMonth()];
      const d = date.getDate();

      if (!newMoods[y]) newMoods[y] = {};
      if (!newMoods[y][m]) newMoods[y][m] = {};
      newMoods[y][m][d] = { mood: mood, color: color };
    });

    setSelectedMoods(newMoods);
  }

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 0; i <= totalDays; i++) {
    days.push(i);
  }
  for (let i = 0; i < days.length; i += 7) {
    weekChunks.push(days.slice(i, i + 7));
  }

  useInitialData(
    getMoodLegend,
    getMood,
    setInactiveMoodDays,
    getJoinedDate,
    selectedYear,
    selectedMonth,
    totalDays
  );

  return (
    <>
      <PageTitle />
      <div className="mood-container">
        <MoodTracker
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          months={months}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          years={years}
          nameOfDays={nameOfDays}
          weekChunks={weekChunks}
          selectedMoods={selectedMoods}
          setMoods={setMoods}
        />
        <MoodLegend
          handleOpenAddMoodLegendPopup={handleOpenAddMoodLegendPopup}
          moodOptions={moodOptions}
          visibleLegendOptions={visibleLegendOptions}
          setVisibleLegendOptions={setVisibleLegendOptions}
        />
        <Popup
          type="add-mood-option"
          open={isAddMoodLegendOpen}
          setIsOpen={setIsAddMoodLegendOpen}
          value={newMoodColor}
          handleAdd={addMoodLegend}
          setNewValue={setNewMoodColor}
          setNewValueText={setNewMoodName}
          textValue={newMoodName}
        />
        <Popup
          type="add-mood"
          open={isMoodPopupOpen}
          setIsOpen={setIsMoodPopupOpen}
          visibleLegendOptions={visibleLegendOptions}
          value={moodOptions}
          setVisibleLegendOptions={setVisibleLegendOptions}
          handleAdd={updateMood}
          addMood={addMood}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
        />
      </div>
    </>
  );
};

export default Mood;
