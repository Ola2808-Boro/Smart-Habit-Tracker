import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import Paragraph from "../../atoms/Paragraph/Paragraph";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import {
  StyledForm,
  StyledCategoriesContainer,
  StyledCategory,
} from "./Popup.styles";
const CustomPopup = ({
  open,
  value,
  categories,
  type,
  setNewValue,
  handleSelectCategory,
  setIsOpen,
  handleAdd,
}) => {
  if (type === "save-habit") {
    return (
      <Popup open={open} onClose={() => setIsOpen(false)} modal>
        <StyledForm onSubmit={handleAdd}>
          <Paragraph text="Add habit" />
          <Input
            type="text"
            value={value}
            maxLength={30}
            onChange={(e) => {
              setNewValue(e.target.value);
            }}
          />
          <StyledCategoriesContainer>
            {Object.entries(categories)?.map(
              ([category, isSelected], index) => (
                <StyledCategory
                  isSelected={isSelected}
                  key={index}
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
  } else if (type === "save-category") {
    return (
      <Popup open={open} onClose={() => setIsOpen(false)} modal>
        <StyledForm onSubmit={handleAdd}>
          <Paragraph text="Add category" />
          <Input
            type="text"
            value={value}
            maxLength={20}
            onChange={(e) => {
              setNewValue(e.target.value);
            }}
          />
          <Button type="submit" text="Save category" />
        </StyledForm>
      </Popup>
    );
  }
};

CustomPopup.defaultProps = {};

CustomPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  categories: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  setNewValue: PropTypes.func.isRequired,
  handleSelectCategory: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};

export default CustomPopup;
