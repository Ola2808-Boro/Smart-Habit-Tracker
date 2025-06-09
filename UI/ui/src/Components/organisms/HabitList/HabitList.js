import PropTypes from "prop-types";
import { StyledHabitList, StyledHabitContainer } from "./HabitList.styles";
import DragItem from "../DragItem/DragItem.js";
import Button from "../../atoms/Button/Button";
import Paragraph from "../../atoms/Paragraph/Paragraph.js";

const HabitList = ({ habits, setIsHabitPopupOpen, setIsCategoryPopupOpen }) => {
  return (
    <StyledHabitContainer>
      <Paragraph text="Habits" />
      <StyledHabitList>
        {habits &&
          Object.entries(habits)?.map(([name, data], index) => (
            <DragItem
              key={data.habit}
              name={data.habit}
              categories={data.categories}
            />
          ))}
      </StyledHabitList>
      <Button
        type="button"
        text="+ Add habit"
        click={() => setIsHabitPopupOpen(true)}
      />
      <Button
        type="button"
        text="+ Add category"
        click={() => setIsCategoryPopupOpen(true)}
      />
    </StyledHabitContainer>
  );
};

HabitList.defaultProps = {};

HabitList.propTypes = {
  habits: PropTypes.object.isRequired,
  setIsCategoryPopupOpen: PropTypes.func.isRequired,
  setIsHabitPopupOpen: PropTypes.func.isRequired,
};

export default HabitList;
