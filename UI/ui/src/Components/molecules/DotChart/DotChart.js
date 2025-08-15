import Plot from "react-plotly.js";
import PropTypes from "prop-types";
import Input from "../../atoms/Input/Input";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import VisibleMore from "../VisibleMore/VisibleMore";
import { StyledControlsRow, StyledContainer } from "./DotChart.styles";

const DotChart = ({
  habits_data,
  handleChangeState,
  visibleHabits,
  setVisibleHabits,
}) => {
  const habitNames = Object.keys(habits_data);
  const habitNamesFiltered = Object.keys(habits_data).filter(
    (name) => habits_data[name].checked
  );
  const doneCounts = habitNamesFiltered.map((name) => {
    if (habits_data[name].checked) {
      return habits_data[name].done || 0;
    }
    return null;
  });
  const notDoneCounts = habitNamesFiltered.map((name) => {
    if (habits_data[name].checked) {
      return habits_data[name].notDone || 0;
    }
    return null;
  });
  const traceDone = {
    type: "scatter",
    mode: "markers",
    name: "Done",
    x: doneCounts,
    y: habitNames,
    marker: { color: "green", size: 12 },
  };

  const traceNotDone = {
    type: "scatter",
    mode: "markers",
    name: "Not Done",
    x: notDoneCounts,
    y: habitNames,
    marker: { color: "red", size: 12 },
  };

  const layout = {
    title: "Habit Completion Overview",
    height: "100%",
    width: "100%",
    xaxis: {
      title: "Count",
      rangemode: "tozero",
    },
    yaxis: {
      automargin: true,
    },
  };
  return (
    <StyledContainer>
      <StyledControlsRow>
        {habitNames.slice(0, visibleHabits).map((name) => (
          <>
            <Input
              type="checkbox"
              checked={habits_data[name]["checked"]}
              onChange={() =>
                handleChangeState(name, habits_data[name]["checked"])
              }
            />
            <Paragraph text={name} />
          </>
        ))}
      </StyledControlsRow>
      <VisibleMore
        setVisible={setVisibleHabits}
        retrievedData={habits_data}
        visible={visibleHabits}
      />
      <Plot
        data={[traceDone, traceNotDone]}
        layout={{
          title: "Habit Completion Overview",
          margin: { l: 80, r: 40, t: 50, b: 50 },
          autosize: true,
          xaxis: { title: "Count", rangemode: "tozero" },
          yaxis: { automargin: true },
        }}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
      />
    </StyledContainer>
  );
};

DotChart.propTypes = {
  habits_data: PropTypes.arrayOf(
    PropTypes.shape({
      habit_id: PropTypes.number.isRequired,
      habit_name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DotChart;
