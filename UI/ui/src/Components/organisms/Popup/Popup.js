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
  MoodLegendContainer,
  MoodLegendTypeContainer,
  MoodTypeContainer,
} from "./Popup.styles";
import { HexColorPicker } from "react-colorful";
import VisibleMore from "../../molecules/VisibleMore/VisibleMore";
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
  visibleLegendOptions,
  setVisibleLegendOptions,
  setNewValueText,
  addMood,
  selectedDay,
  selectedMonth,
  selectedYear,
  textValue,
}) => {
  const closePopup = () => setIsOpen(false);
  const isMobile = window.innerWidth <= 768;

  const popupContentStyle = {
    width: isMobile ? "90%" : "50%",
    padding: "5px",
    background: "#fff",
    border: "1px solid #d7d7d7",
    margin: "auto",
    borderRadius: isMobile ? "0" : "8px",
  };

  if (type === "save-habit") {
    return (
      <Popup
        open={open}
        onClose={closePopup}
        modal
        closeOnEscape={true}
        closeOnDocumentClick={true}
        contentStyle={popupContentStyle}
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
        contentStyle={popupContentStyle}
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
        contentStyle={popupContentStyle}
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
        contentStyle={popupContentStyle}
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
        contentStyle={popupContentStyle}
      >
        <StyledForm onSubmit={handleAdd}>
          <Paragraph text="Add mood option" />
          <HexColorPicker color={value} onChange={setNewValue} />
          <StyledTextArea
            value={textValue}
            maxLength={255}
            onChange={(e) => {
              setNewValueText(e.target.value);
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
        contentStyle={popupContentStyle}
      >
        <StyledForm onSubmit={handleAdd}>
          <MoodLegendContainer>
            {value &&
              value
                .slice(0, visibleLegendOptions)
                .map(([mood, color], index) => {
                  return (
                    <MoodLegendTypeContainer
                      key={index}
                      onClick={(e) =>
                        addMood(e, selectedYear, selectedMonth, selectedDay)
                      }
                    >
                      <MoodTypeContainer
                        data-mood={mood}
                        data-color={color}
                        backgroundColor={color}
                      ></MoodTypeContainer>
                      <Paragraph text={mood} />
                    </MoodLegendTypeContainer>
                  );
                })}
          </MoodLegendContainer>
          <VisibleMore
            retrievedData={value}
            visible={visibleLegendOptions}
            setVisible={setVisibleLegendOptions}
          />
          <Button type="submit" text="Save mood" />
        </StyledForm>
      </Popup>
    );
  }

  return null;
};

CustomPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired || PropTypes.array,
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
