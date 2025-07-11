import PropTypes from "prop-types";
import { StyledVisibleMore } from "./VisibleMore.styles";
import Button from "../../atoms/Button/Button";

/**
 * Component for displaying the "See more" button when there are more notes to show.
 */
const VisibleMore = ({ visible, retrievedData, setVisible }) => {
  return (
    <>
      {retrievedData && visible < retrievedData.length && (
        <StyledVisibleMore>
          <Button
            type="button"
            click={() => setVisible(visible + 6)}
            text="See more"
            size="small"
          />
        </StyledVisibleMore>
      )}
    </>
  );
};

VisibleMore.propTypes = {
  visibleNotes: PropTypes.number.isRequired,
  retrievedQandA: PropTypes.arrayOf(PropTypes.array).isRequired,
  setVisibleNotes: PropTypes.func.isRequired,
};

export default VisibleMore;
