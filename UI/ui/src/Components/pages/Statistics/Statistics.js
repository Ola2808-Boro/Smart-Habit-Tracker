import { MainContainer } from "./Statistics.styles";
import React, { useState } from "react";
import PageTitle from "../../atoms/PageTitle/PageTitle";
import PieChart from "../../atoms/PieChart/PieChart";
import BarChart from "../../atoms/BarChart/BarChart";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import WeaklyStats from "../../molecules/WeaklyStats/WeaklyStats";
import DotChart from "../../atoms/DotChart/DotChart";
import { parseDurationToMinutes } from "../../../utils/statistics/statistics";
import {
  useInitialData,
  useWeekSelector,
  useWeaklyStats,
} from "../../../hooks/statistics/statistics";
import { fetchMoodLegendData } from "../../../api/mood/mood";
import {
  fetchCategoriesStatistsics,
  fetchMoodsStatistsics,
  fetchWeeklyProgressStats,
  fetchHabitsStatistsics,
} from "../../../api/statistics/statistics";

const Statistics = () => {
  const [categoryFrequency, setCategoryFrequency] = useState({});
  const [moodFrequency, setMoodFrequency] = useState({});
  const [moodOptions, setMoodOptions] = useState([]);
  const [categoryDuration, setCategoryDuration] = useState({});
  const [weaklyStats, setWeaklyStats] = useState({});
  const [habitsStats, setHabitsStats] = useState([]);
  const [visibleHabitsStats, setVisibleHabitsStats] = useState([]);
  const { handleNextWeek, handlePrevWeek, endDate, startDate, setStartDate } =
    useWeekSelector();

  async function setHabitsStatistics() {
    const response = await fetchHabitsStatistsics();
    const grouped = {};
    response.data.results.forEach((item) => {
      if (!grouped[item.habit_name]) {
        grouped[item.habit_name] = { done: 0, notDone: 0 };
      }
      if (item.done) {
        grouped[item.habit_name].done = item.count;
      } else {
        grouped[item.habit_name].notDone = item.count;
      }
    });
    setHabitsStats(grouped);
    setVisibleHabitsStats(Object.keys(grouped));
    console.log("setHabitStatistics", response.data.results);
  }
  async function setWeaklyStatistics() {
    const response = await fetchWeeklyProgressStats(startDate);
    const response1 = await fetchMoodLegendData();
    setWeaklyStats({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: response.data.results[0],
      moods: response.data.results[1],
    });
    setMoodOptions(response1.data["mood"]);
  }

  async function setMoodStatistics() {
    const response = await fetchMoodsStatistsics();
    setMoodFrequency({
      labels: response.data.results[1][0],
      values: response.data.results[1][1],
      moods: response.data.results[0].map((item) => [
        item[1],
        item[2],
        item[3],
      ]),
    });
  }
  async function setCategoriesStatistics() {
    const response = await fetchCategoriesStatistsics();
    if (response["data"]) {
      setCategoryFrequency(response["data"]["results"][1]);
      setCategoryDuration(response["data"]["results"][0]);
      let labels = [];
      let values = [];
      let customValues = [];
      response["data"]["results"][0].forEach(function (item, index) {
        labels.push(item[0]);
        values.push(parseDurationToMinutes(item[1]));
        customValues.push(item[1]);
      });
      setCategoryDuration({
        labels: labels,
        values: values,
        customValues: customValues,
      });
      setCategoryFrequency({
        labels: response["data"]["results"][1][0],
        values: response["data"]["results"][1][1],
        customValues: response["data"]["results"][1][1],
      });
    }
  }

  useInitialData(
    setCategoriesStatistics,
    setMoodStatistics,
    setWeaklyStatistics,
    setHabitsStatistics
  );
  useWeaklyStats(startDate, setWeaklyStatistics);

  const handleWeekChange = (newStartDate) => {
    console.log("Nowy tydzień:", newStartDate.format("YYYY-MM-DD"));
  };
  return (
    <>
      <PageTitle />
      <MainContainer>
        <PieChart text="Category frequency" data={categoryDuration} />
        <PieChart text="Category frequency" data={categoryFrequency} />
        <BarChart text="Category frequency" data={moodFrequency} />
        <WeaklyStats
          startDate={startDate}
          endDate={endDate}
          handleNextWeek={handleNextWeek}
          handlePrevWeek={handlePrevWeek}
          weaklyStats={weaklyStats}
          moodOptions={moodOptions}
          visibleLegendOptions={6}
        />
        <DotChart habits_data={habitsStats} />
      </MainContainer>
    </>
  );
};

export default Statistics;
