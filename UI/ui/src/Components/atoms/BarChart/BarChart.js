import PropTypes from "prop-types";
import { PALETTE } from "./BarChart.styles.js";
import Plot from "react-plotly.js";
const BarChart = ({ data, text }) => {
  const sliceCount = data["values"]?.length;
  const colors = PALETTE.slice(0, sliceCount);

  return (
    <Plot
      data={[
        {
          type: "bar",
          x: data.labels,
          y: data.values,
          marker: { color: colors },
          text: data.customValues,
          textinfo: "text",
          customdata: data.values,
          hovertemplate: "%{label}: %{customdata}<extra></extra>",
        },
      ]}
      layout={{
        title: { text },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        legend: { bgcolor: "rgba(0,0,0,0)" },
        modebar: { bgcolor: "rgba(0,0,0,0)" },
        yaxis: {
          rangemode: "tozero",
          tickformat: ",d",
          ticksuffix: "",
        },
      }}
    />
  );
};

// Default props for the BarChart component
BarChart.propTypes = {
  data: PropTypes.shape({
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    customValues: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
  }).isRequired,
  text: PropTypes.string,
};

BarChart.defaultProps = {
  text: "",
};

export default BarChart;
