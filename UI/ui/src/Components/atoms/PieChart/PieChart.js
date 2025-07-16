import PropTypes from "prop-types";
import { StyledIPieChart } from "./PieChart.styles.js";
import Plot from "react-plotly.js";
const PieChart = ({ data, text }) => {
  console.log(data, data["values"], data["labels"]);
  return (
    <Plot
      data={[
        {
          type: "pie",
          values: data.values,
          labels: data.labels,
          text: data.customValues, // etykiety na wykresie
          textinfo: "text", // pokazuj tylko nasz tekst
          customdata: data.customValues, // dodatkowe dane do hovera
          hovertemplate: "%{label}: %{customdata}<extra></extra>", // tekst hovera
        },
      ]}
      layout={{ title: { text: text } }}
    />
  );
};

// Default props for the PieChart component
PieChart.defaultProps = {};

PieChart.propTypes = {};

export default PieChart;
