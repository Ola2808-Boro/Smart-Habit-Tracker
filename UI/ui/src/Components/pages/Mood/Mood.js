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
    e.preventDefault();
    const response = addNewMoodLegendData(newMoodName, newMoodColor);
    addMoodToLegend();
  }
  async function handleOpenAddMoodLegendPopup() {
    setIsAddMoodLegendOpen(true);
  }

  async function setMoods(day) {
    setSelectedDay(day);
    setIsMoodPopupOpen(true);
  }

  async function updateMood(e) {
    e.preventDefault();
    const day = selectedDay;
    const mood = selectedMoods[selectedYear][selectedMonth][day].mood;
    const response = await updateMoodData(mood);
    setIsMoodPopupOpen(false);
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
  useNewMoodData(getMood, setInactiveMoodDays, selectedMonth, selectedYear);

  return (
    <>
      <PageTitle />
      <div className="mood-container">
        <div className="mood-tracker-container">
          <div className="mood-tracker-container-options">
            <select
              className="select-option"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months &&
                months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
            </select>
            <select
              className="select-option"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years &&
                years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>
          <div className="mood-tracker-days-name">
            {nameOfDays &&
              nameOfDays.map((dayName, idx) => (
                <div key={idx} className="mood-tracker-day-name">
                  {dayName}
                </div>
              ))}
          </div>
          {weekChunks &&
            weekChunks.map((week, weekIndex) => (
              <div key={weekIndex} className="mood-tracker-week-row">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`mood-tracker-day`}
                    style={{
                      backgroundColor:
                        selectedMoods?.[selectedYear]?.[selectedMonth]?.[day]
                          ?.color,
                    }}
                    onClick={
                      day === new Date().getDate()
                        ? () => setMoods(day)
                        : undefined
                    }
                  >
                    {day ? day : ""}
                  </div>
                ))}
              </div>
            ))}
        </div>
        {/* <div className="mood-legend">
          <div className="mood-legend-p-container">
            <p>Moods:</p>
          </div>
          <div className="mood-legend-container">
            {moodOptions &&
              moodOptions
                .slice(0, visibleLegendOptions)
                .map(([mood, color], index) => {
                  return (
                    <div key={index} className="mood-legend-type-container">
                      <div
                        className={`mood-type-container`}
                        data-mood={mood}
                        data-color={color}
                        style={{ backgroundColor: color }}
                      ></div>
                      <div>
                        <p>{mood}</p>
                      </div>
                    </div>
                  );
                })}
          </div>
          {visibleLegendOptions < moodOptions.length && (
            <div className="more-notes-container">
              <button
                className="form-button"
                onClick={() =>
                  setVisibleLegendOptions(visibleLegendOptions + 6)
                }
              >
                See more
              </button>
            </div>
          )}
          <button
            className="form-button"
            onClick={handleOpenAddMoodLegendPopup}
          >
            Add mood type
          </button>
        </div> */}
        <Popup
          open={isAddMoodLegendOpen}
          setIsOpen={setIsAddMoodLegendOpen}
          newMoodColor={newMoodColor}
          setNewMoodColor={setNewMoodColor}
        />
        <Popup
          open={isMoodPopupOpen}
          setIsOpen={setIsMoodPopupOpen}
          visibleLegendOptions={visibleLegendOptions}
          moodOptions={moodOptions}
          setVisibleLegendOptions={setVisibleLegendOptions}
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
