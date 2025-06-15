import PropTypes from "prop-types";
import { StyledCategories } from "./Categories.styles";
import Category from "../../atoms/Category/Category";
// Categories component displays a list of Category buttons
const Categories = ({ categories }) => {
  return (
    <StyledCategories>
      {categories.map((cat, index) => (
        <Category key={index} text={cat} />
      ))}
    </StyledCategories>
  );
};

// Prop types for Categories
Categories.propTypes = {
  /** Array of category names (strings) */
  categories: PropTypes.array.isRequired,
};

export default Categories;
