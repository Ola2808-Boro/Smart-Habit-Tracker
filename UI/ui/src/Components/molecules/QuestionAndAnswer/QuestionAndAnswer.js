import PropTypes from "prop-types";
import { StyledQandAContainer } from "./QuestionAndAnswer.styles";
import Button from "../../atoms/Button/Button";

const QuestionAndAnswer = ({
  handleOpenPopupAddQuestion,
  handleOpenPopupQandA,
}) => {
  return (
    <StyledQandAContainer>
      <Button
        type="button"
        onClick={handleOpenPopupQandA}
        text="Get a random question"
      />
      <Button
        type="button"
        onClick={handleOpenPopupAddQuestion}
        text="Add a new question"
      />
    </StyledQandAContainer>
  );
};

QuestionAndAnswer.propTypes = {};

export default QuestionAndAnswer;
