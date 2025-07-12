import PropTypes from "prop-types";
import {
  StyledMoodType,
  StyledMoodTypeText,
  StyledMoodTypeContainer,
} from "./MoodType.styles";

const MoodType = ({ index, mood, color }) => {
  return (
    <StyledMoodTypeContainer key={index}>
      <StyledMoodType
        data-mood={mood}
        backgroundColor={color}
        data-color={color}
      />
      <StyledMoodTypeText>{mood}</StyledMoodTypeText>
    </StyledMoodTypeContainer>
  );
};
// Default props for MoodType
MoodType.defaultProps = {};

// Prop types for MoodType
MoodType.propTypes = {
  index: PropTypes.number,
  mood: PropTypes.string,
  color: PropTypes.string,
};

export default MoodType;
