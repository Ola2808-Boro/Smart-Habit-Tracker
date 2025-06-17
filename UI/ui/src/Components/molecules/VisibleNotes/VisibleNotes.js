import PropTypes from "prop-types";
import { StyledVisibleNotes } from "./VisibleNotes.styles";
import Button from "../../atoms/Button/Button";

/**
 * Component for displaying the "See more" button when there are more notes to show.
 */
const VisibleNotes = ({ visibleNotes, retrievedQandA, setVisibleNotes }) => {
  return (
    <>
      {visibleNotes < retrievedQandA.length && (
        <StyledVisibleNotes>
          <Button
            type="button"
            onClick={() => setVisibleNotes(visibleNotes + 6)}
            text="See more"
          />
        </StyledVisibleNotes>
      )}
    </>
  );
};

VisibleNotes.propTypes = {
  visibleNotes: PropTypes.number.isRequired,
  retrievedQandA: PropTypes.arrayOf(PropTypes.array).isRequired,
  setVisibleNotes: PropTypes.func.isRequired,
};

export default VisibleNotes;
