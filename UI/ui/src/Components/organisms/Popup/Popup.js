import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import {
  StyledForm,
  StyledCategoriesContainer,
  StyledCategory,
  StyledTextArea,
} from "./Popup.styles";
import { HexColorPicker } from "react-colorful";
/**
 * Reusable popup modal for saving habits, categories, questions, or answers.
 */
const CustomPopup = ({
  open,
  value,
  categories,
  type,
  setNewValue,
  handleSelectCategory,
  setIsOpen,
  handleAdd,
  question,
  newMoodColor,
  setNewMoodColor,
  visibleLegendOptions,
  moodOptions,
  setVisibleLegendOptions,
  addMood,
  selectedYear,
  selectedMonth,
  selectedDay,
}) => {
  const closePopup = () => setIsOpen(false);

  if (type === "save-habit") {
    return (
      <Popup
        open={open}
        onClose={closePopup}
        modal
        closeOnEscape={true}
        closeOnDocumentClick={true}
      >
        <StyledForm onSubmit={handleAdd}>
          <Paragraph text="Add habit" />
          <Input
            type="text"
            value={value}
            maxLength={60}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <StyledCategoriesContainer>
            {categories &&
              Object.entries(categories).map(
                ([category, isSelected], index) => (
                  <StyledCategory
                    key={index}
                    isSelected={isSelected}
                    data-category={category}
                    onClick={handleSelectCategory}
                  >
                    {category}
                  </StyledCategory>
                )
              )}
          </StyledCategoriesContainer>
          <Button type="submit" text="Save habit" />
        </StyledForm>
      </Popup>
    );
  }

  if (type === "save-category") {
    return (
      <Popup
        open={open}
        onClose={closePopup}
        modal
        closeOnEscape={true}
        closeOnDocumentClick={true}
      >
        <StyledForm onSubmit={handleAdd}>
          <Paragraph text="Add category" />
          <Input
            type="text"
            value={value}
            maxLength={20}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <Button type="submit" text="Save category" />
        </StyledForm>
      </Popup>
    );
  }

  if (type === "add-question") {
    return (
      <Popup
        open={open}
        onClose={closePopup}
        modal
        closeOnEscape={true}
        closeOnDocumentClick={true}
      >
        <StyledForm onSubmit={handleAdd}>
          <Paragraph text="Add question" />
          <StyledTextArea
            value={value}
            maxLength={255}
            onChange={(e) => {
              setNewValue(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            rows={1}
          />
          <Button type="submit" text="Save question" />
        </StyledForm>
      </Popup>
    );
  }

  if (type === "question-answer") {
    return (
      <Popup
        open={open}
        onClose={closePopup}
        modal
        closeOnEscape={true}
        closeOnDocumentClick={true}
      >
        <StyledForm onSubmit={handleAdd}>
          <Paragraph text={question || "Answer the question"} />
          <StyledTextArea
            value={value}
            maxLength={255}
            onChange={(e) => {
              setNewValue(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            rows={1}
          />
          <Button type="submit" text="Save answer" />
        </StyledForm>
      </Popup>
    );
  }
  if (type === "add-mood-option") {
    return (
      <Popup
        open={open}
        onClose={closePopup}
        modal
        closeOnEscape={true}
        closeOnDocumentClick={true}
      >
        <StyledForm onSubmit={handleAdd}>
          <Paragraph text="Add mood option" />
          <HexColorPicker color={newMoodColor} onChange={setNewMoodColor} />
          <StyledTextArea
            value={value}
            maxLength={255}
            onChange={(e) => {
              setNewValue(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            rows={1}
          />
          <Button type="submit" text="Save mood type" />
        </StyledForm>
      </Popup>
    );
  }
  if (type === "add-mood") {
    return (
      <Popup
        open={open}
        onClose={closePopup}
        modal
        closeOnEscape={true}
        closeOnDocumentClick={true}
      >
        <StyledForm onSubmit={handleAdd}>
          <div className="mood-legend-container">
            {moodOptions &&
              moodOptions
                .slice(0, visibleLegendOptions)
                .map(([mood, color], index) => {
                  return (
                    <div
                      key={index}
                      className="mood-legend-type-container"
                      onClick={(e) =>
                        addMood(e, selectedYear, selectedMonth, selectedDay)
                      }
                    >
                      <div
                        className={`mood-type-container`}
                        data-mood={mood}
                        data-color={color}
                        style={{ backgroundColor: color }}
                      ></div>
                      <div>
                        <p>{mood}</p>
                      </div>
                    </div>
                  );
                })}
            {visibleLegendOptions < moodOptions.length && (
              <div className="more-notes-container">
                <button
                  className="form-button"
                  type="button"
                  onClick={() =>
                    setVisibleLegendOptions(visibleLegendOptions + 6)
                  }
                >
                  See more
                </button>
              </div>
            )}
          </div>
          <Button type="submit" text="Save mood" />
        </StyledForm>
      </Popup>
    );
  }

  return null;
};

CustomPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "save-habit",
    "save-category",
    "add-question",
    "question-answer",
    "add-mood",
    "add-mood-option",
  ]).isRequired,
  setNewValue: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  categories: PropTypes.objectOf(PropTypes.bool),
  handleSelectCategory: PropTypes.func,
  question: PropTypes.string,
};

CustomPopup.defaultProps = {
  categories: {},
  handleSelectCategory: () => {},
  question: "",
};

export default CustomPopup;
