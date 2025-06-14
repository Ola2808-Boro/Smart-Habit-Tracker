import PropTypes from "prop-types";
import { useDrop } from "react-dnd";

const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        border: `1px dashed ${isOver ? "green" : "black"}`,
        padding: "10px",
        width: "100%",
      }}
    >
      Drop here
    </div>
  );
};

// Prop types for DropZone
DropZone.propTypes = {
  onDrop: PropTypes.func,
};

export default DropZone;
