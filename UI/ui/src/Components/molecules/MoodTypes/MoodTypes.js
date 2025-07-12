import PropTypes from "prop-types";
import MoodType from "../../atoms/MoodType/MoodType";
import { StyledMoodTypesContainer } from "./MoodTypes.styles";

const MoodTypes = ({ moodOptions, visibleLegendOptions }) => {
  return (
    <StyledMoodTypesContainer>
      {moodOptions &&
        moodOptions
          .slice(0, visibleLegendOptions)
          .map(([mood, color], index) => {
            return <MoodType index={index} color={color} mood={mood} />;
          })}
    </StyledMoodTypesContainer>
  );
};
// Default props for MoodTypes
MoodTypes.defaultProps = {};

// Prop types for MoodType
MoodTypes.propTypes = {
  moodOptions: PropTypes.array,
  visibleLegendOptions: PropTypes.number,
};

export default MoodTypes;
