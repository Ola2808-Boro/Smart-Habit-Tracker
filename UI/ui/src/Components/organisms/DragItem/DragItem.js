import React from "react";
import { useDrag } from "react-dnd";
import "./DragItem.css";

const DragItem = ({ name, categories }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { name, categories },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      key={name}
      ref={drag}
      className="drag-item"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {name}
      <div className="categories">
        {categories?.map((category, index) => (
          <div key={index} className="category">
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragItem;
