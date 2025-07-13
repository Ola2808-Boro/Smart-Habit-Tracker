import PropTypes from "prop-types";
import { StyledIPieChart } from "./PieChart.styles.js";
import Plot from "react-plotly.js";
const PieChart = ({}) => {
  return (
    <Plot
      data={[{ type: "pie", values: [1, 2, 3] }]}
      layout={{ width: 320, height: 240, title: { text: "A Fancy Plot" } }}
    />
  );
};

// Default props for the PieChart component
PieChart.defaultProps = {};

PieChart.propTypes = {};

export default PieChart;
