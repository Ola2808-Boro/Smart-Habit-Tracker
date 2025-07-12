import { MainContainer } from "./Mood.styles.js";
import { useState } from "react";
import PageTitle from "../../atoms/PageTitle/PageTitle";
import {
  fetchJoinedDateData,
  fetchMoodData,
  fetchMoodLegendData,
  createMoodOption,
  updateMoodData,
} from "../../../api/mood/mood";
import ReactJsAlert from "reactjs-alert";
import { useInitialData } from "../../../hooks/mood/mood";
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
  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    quote: "",
    type: "info",
  });
  const days = [];
  const weekChunks = [];
  const firstDay = new Date(selectedYear, new Date().getMonth()).getDay();
  const totalDays = daysInMonth(selectedYear, new Date().getMonth());

  async function loadMoodLegend() {
    const response = await fetchMoodLegendData();
    setMoodOptions(response.data["mood"]);
  }
  async function handleAddMoodLegend(e) {
    setNewMoodColor();
    e.preventDefault();
    if (e.target.value) {
      const response = createMoodOption(newMoodName, newMoodColor);
      addMoodToLegend();
    } else {
      setIsAddMoodLegendOpen(false);
      setAlert({
        visible: true,
        title: "Adding mood type",
        quote: "Can't add mood type because none has been entered",
        type: "warning",
      });
    }
  }
  async function handleOpenAddMoodLegendPopup() {
    setIsAddMoodLegendOpen(true);
  }

  async function setMoods(day) {
    setSelectedDay(day);
    setIsMoodPopupOpen(true);
  }

  async function handleUpdateMood(e) {
    e.preventDefault();
    if (e.target.value) {
      addMood(e, selectedYear, selectedMonth, selectedDay);
      const day = selectedDay;
      const mood = selectedMoods[selectedYear][selectedMonth][day].mood;
      const response = await updateMoodData(mood);
      setIsMoodPopupOpen(false);
      await loadMood();
    } else {
      setIsMoodPopupOpen(false);
      setAlert({
        visible: true,
        title: "Adding mood",
        quote: "Can't add mood because none has been selected from the list ",
        type: "warning",
      });
    }
  }
  async function loadUserJoinedDate() {
    const response = await fetchJoinedDateData();
    const dateJoinYear = new Date(response["data"]["date_join"]).getFullYear();
    const years = [];
    for (let i = selectedYear; i >= dateJoinYear; i -= 1) {
      years.push(i);
    }
    setYears(years);
  }

  async function loadMood() {
    const response = await fetchMoodData();
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
    loadMoodLegend,
    loadMood,
    setInactiveMoodDays,
    loadUserJoinedDate,
    selectedYear,
    selectedMonth,
    totalDays
  );

  return (
    <>
      <PageTitle />
      <MainContainer>
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
          handleAdd={handleAddMoodLegend}
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
          handleAdd={handleUpdateMood}
          addMood={addMood}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDay={selectedDay}
        />
        <ReactJsAlert
          status={alert.visible}
          type={alert.type}
          title={alert.title}
          isQuotes={true}
          quote={alert.quote}
          Close={() => setAlert((prev) => ({ ...prev, visible: false }))}
        />
      </MainContainer>
    </>
  );
};

export default Mood;
