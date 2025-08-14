import PropTypes from "prop-types";
import { PALETTE } from "./PieChart.styles.js";
import Plot from "react-plotly.js";
const PieChart = ({ data, text }) => {
  const sliceCount = data["values"]?.length;
  const colors = PALETTE.slice(0, sliceCount);

  return (
    <Plot
      data={[
        {
          type: "pie",
          values: data.values,
          labels: data.labels,
          hole: 0.5,
          marker: { colors },
          text: data.customValues,
          textinfo: "text",
          customdata: data.customValues,
          hovertemplate: "%{label}: %{customdata}<extra></extra>",
        },
      ]}
      layout={{
        title: { text },
        margin: { l: 10, r: 10, t: 30, b: 10 },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        legend: {
          bgcolor: "rgba(0,0,0,0)",
          x: 1,
          font: {
            size: Math.max(8, 15 - sliceCount * 0.3),
          },
        },
        modebar: { bgcolor: "rgba(0,0,0,0)" },
      }}
      config={{ autosizable: true }}
      useResizeHandler={true}
    />
  );
};

// Default props for the PieChart component
PieChart.propTypes = {
  data: PropTypes.shape({
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    customValues: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
  }).isRequired,
  text: PropTypes.string,
};

PieChart.defaultProps = {
  text: "",
};

export default PieChart;
