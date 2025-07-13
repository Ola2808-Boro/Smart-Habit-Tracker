import { MainContainer } from "./Statistics.styles";
import React from "react";
import PageTitle from "../../atoms/PageTitle/PageTitle";
import PieChart from "../../atoms/PieChart/PieChart";
import Paragraph from "../../atoms/Paragraph/Paragraph";
const Statistics = () => {
  return (
    <>
      <PageTitle />
      <MainContainer>
        <PieChart />
        <Paragraph text="hallo" />
      </MainContainer>
    </>
  );
};

export default Statistics;
