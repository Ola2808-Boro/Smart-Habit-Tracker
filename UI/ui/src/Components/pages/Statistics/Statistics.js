import { MainContainer } from "./Statistics.styles";
import React, { useState } from "react";
import PageTitle from "../../atoms/PageTitle/PageTitle";
import PieChart from "../../atoms/PieChart/PieChart";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import { parseDurationToMinutes } from "../../../utils/statistics/statistics";
import { useInitialData } from "../../../hooks/statistics/statistics";
import {
  fetchCategoriesStatistsics,
  fetchMoodsStatistsics,
} from "../../../api/statistics/statistics";
const Statistics = () => {
  const [categoryFrequency, setCategoryFrequency] = useState({});
  const [moodFrequency, setMoodFrequency] = useState({});
  const [categoryDuration, setCategoryDuration] = useState({});

  async function setCategoriesStatistics() {
    console.log("setCategoriesStatistics");
    const response = await fetchCategoriesStatistsics();
    if (response["data"]) {
      console.log(
        response["data"]["results"][1],
        response["data"]["results"][0],
        response["data"]
      );
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

  useInitialData(setCategoriesStatistics);

  return (
    <>
      <PageTitle />
      <MainContainer>
        <PieChart text="Category frequency" data={categoryDuration} />
        <PieChart text="Category frequency" data={categoryFrequency} />
        <Paragraph text="hallo" />
      </MainContainer>
    </>
  );
};

export default Statistics;
