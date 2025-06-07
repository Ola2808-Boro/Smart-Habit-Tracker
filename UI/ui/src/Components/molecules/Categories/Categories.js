import React from "react";
import PropTypes from "prop-types";
import { StyledCategories } from "./Categories.styles";
import Category from "../../atoms/Category/Category";
const Categories = ({ categories }) => {
  return (
    <StyledCategories>
      {categories.map((cat, index) => (
        <Category key={index} text={cat} />
      ))}
    </StyledCategories>
  );
};

Categories.defaultProps = {};

Categories.propTypes = {};

export default Categories;
