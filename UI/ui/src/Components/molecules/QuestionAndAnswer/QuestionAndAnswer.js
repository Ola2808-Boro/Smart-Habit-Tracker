import PropTypes from "prop-types";
import { StyledQandAContainer } from "./QuestionAndAnswer.styles";
import Button from "../../atoms/Button/Button";

const QuestionAndAnswer = ({ handleOpenPopupQandA, setIsOpenAddQuestion }) => {
  return (
    <StyledQandAContainer>
      <Button
        type="button"
        click={() => handleOpenPopupQandA()}
        text="Get a random question"
      />
      <Button
        type="button"
        click={() => setIsOpenAddQuestion(true)}
        text="Add a new question"
      />
    </StyledQandAContainer>
  );
};

QuestionAndAnswer.propTypes = {};

export default QuestionAndAnswer;
