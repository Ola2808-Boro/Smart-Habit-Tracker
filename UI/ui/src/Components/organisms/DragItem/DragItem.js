import { useDrag } from "react-dnd";
import { StyledDragItem, Categories, Category } from "./DragItem.styles";
import PropTypes from "prop-types";
const DragItem = ({ name, categories }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { name, categories },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <StyledDragItem
      key={name}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {name}
      <Categories>
        {categories?.map((category, index) => (
          <Category key={index} className="category">
            {category}
          </Category>
        ))}
      </Categories>
    </StyledDragItem>
  );
};

// Prop types for DragItem
DragItem.propTypes = {
  categories: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default DragItem;
