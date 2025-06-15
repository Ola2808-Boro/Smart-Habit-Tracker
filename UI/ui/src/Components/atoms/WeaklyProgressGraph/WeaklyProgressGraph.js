import PropTypes from "prop-types";
import { StyledWeaklyProgressGraphContainer } from "./WeaklyProgressGraph.styles";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
const WeaklyProgressGraph = ({ value, max }) => {
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Progress (%)",
        data: value,
        backgroundColor: "  #987afa",
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };
  const options = {
    responsive: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        max: max,
        beginAtZero: true,
      },
    },
  };

  return (
    <StyledWeaklyProgressGraphContainer>
      <Bar data={data} options={options} />
    </StyledWeaklyProgressGraphContainer>
  );
};

// Default props for ProgressBar
WeaklyProgressGraph.defaultProps = {
  value: [0, 0, 0, 0, 0, 0, 0],
  max: 100,
};

// Prop type validation
WeaklyProgressGraph.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  max: PropTypes.number,
};

export default WeaklyProgressGraph;
