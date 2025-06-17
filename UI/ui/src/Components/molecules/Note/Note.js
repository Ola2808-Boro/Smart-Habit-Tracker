import PropTypes from "prop-types";
import {
  StyledNoteAnswer,
  StyledRetrievedNote,
  StyledRetrievedDate,
  StyledRetrievedQuestion,
} from "./Note.styles";
import Paragraph from "../../atoms/Paragraph/Paragraph";

/**
 * Component for displaying a single note with a question, answer, and date.
 */
const Note = ({ data }) => {
  return (
    <StyledRetrievedNote>
      <StyledRetrievedQuestion>
        {/* Display the question */}
        <Paragraph text={data[0]} />
        <StyledRetrievedDate>
          {/* Display the date (extracted and trimmed) */}
          <Paragraph text={data[2]?.split(",")[1]?.slice(0, 12)} />
        </StyledRetrievedDate>
      </StyledRetrievedQuestion>
      <StyledNoteAnswer>
        {/* Display the answer */}
        <Paragraph text={data[1]} />
      </StyledNoteAnswer>
    </StyledRetrievedNote>
  );
};

Note.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired, // [question, answer, date]
};

export default Note;
