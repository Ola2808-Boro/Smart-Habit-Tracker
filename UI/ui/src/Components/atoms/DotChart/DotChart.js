import Plot from "react-plotly.js";
import PropTypes from "prop-types";
import Input from "../Input/Input";
import Paragraph from "../Paragraph/Paragraph";

const DotChart = ({ habits_data }) => {
  const habitNames = Object.keys(habits_data);
  const doneCounts = habitNames.map((name) => habits_data[name].done || 0);
  const notDoneCounts = habitNames.map(
    (name) => habits_data[name].notDone || 0
  );
  console.log(habits_data, habitNames);
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
    margin: { l: 200, r: 40, t: 50, b: 50 },
    height: habitNames.length * 30 + 100,
    xaxis: {
      title: "Count",
      rangemode: "tozero",
    },
    yaxis: {
      automargin: true,
    },
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        {habitNames.map((name) => (
          <>
            <Input type="checkbox" />
            <Paragraph text={name} />
          </>
        ))}
      </div>
      <Plot data={[traceDone, traceNotDone]} layout={layout} />;
    </>
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
