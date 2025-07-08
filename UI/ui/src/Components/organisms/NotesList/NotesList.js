import PropTypes from "prop-types";
import Note from "../../molecules/Note/Note";
import { StyledNotesContainer } from "./NotesList.styles";

/**
 * Component for displaying a list of notes (questions and answers).
 */
const NotesList = ({ visibleNotes, retrievedQandA }) => {
  return (
    <StyledNotesContainer>
      {retrievedQandA &&
        retrievedQandA
          .slice(0, visibleNotes)
          .map((data, index) => <Note key={index} data={data} />)}
    </StyledNotesContainer>
  );
};

NotesList.propTypes = {
  visibleNotes: PropTypes.number.isRequired,
  retreivedQandA: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string) // [question, answer, date]
  ).isRequired,
};

export default NotesList;
