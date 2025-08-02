import PropTypes from "prop-types";
import Plot from "react-plotly.js";
const BarChart = ({ data, text, fixedYAxis }) => {
  const yaxis = fixedYAxis
    ? {
        range: [0, 100],
        tickformat: ",d",
        ticksuffix: "%",
      }
    : {
        rangemode: "tozero",
        tickformat: ",d",
        ticksuffix: "",
        tickmode: "linear",
      };
  const colors = data.moods?.map((moodArray) => moodArray?.[2] || "#d3d3d3");
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
        margin: { l: 40, r: 30, t: 30, b: 50 },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        legend: { bgcolor: "rgba(0,0,0,0)", x: 1 },
        modebar: { bgcolor: "rgba(0,0,0,0)" },
        yaxis: yaxis,
      }}
      config={{ autosizable: true }}
      style={{ width: "100%", height: "100%" }}
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
