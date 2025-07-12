import PropTypes from "prop-types";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import {
  StyledMoodLegendContainer,
  StyledMoodLegendTextContainer,
} from "./MoodLegend.styles";
import MoodTypes from "../../molecules/MoodTypes/MoodTypes";
import Button from "../../atoms/Button/Button";
import VisibleMore from "../../molecules/VisibleMore/VisibleMore";
const MoodLegend = ({
  handleOpenAddMoodLegendPopup,
  moodOptions,
  visibleLegendOptions,
  setVisibleLegendOptions,
}) => {
  return (
    <StyledMoodLegendContainer>
      <StyledMoodLegendTextContainer>
        <Paragraph text="Moods:" />
      </StyledMoodLegendTextContainer>
      <MoodTypes
        moodOptions={moodOptions}
        visibleLegendOptions={visibleLegendOptions}
      />
      <VisibleMore
        setVisible={setVisibleLegendOptions}
        retrievedData={moodOptions}
        visible={visibleLegendOptions}
      />

      <Button
        type="button"
        text="Add mood type"
        click={handleOpenAddMoodLegendPopup}
      />
    </StyledMoodLegendContainer>
  );
};
// Default props for MoodLegend
MoodLegend.defaultProps = {};

// Prop types for MoodLegend
MoodLegend.propTypes = {};

export default MoodLegend;
