import React from "react";
import PropTypes from "prop-types";
import {
  StyledToDoList,
  StyledToDoItem,
  StyledToDoItemContainer,
} from "./ToDoList.styles";
import TaskHeader from "../../molecules/TaskHeader/TaskHeader";
import Categories from "../../molecules/Categories/Categories";
import Button from "../../atoms/Button/Button";
import DropZone from "../../organisms/DropZone/DropZone";
import ToDoListHeader from "../../molecules/ToDoListHeader/ToDoListHeader";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import Paragraph from "../../atoms/Paragraph/Paragraph";
const ToDoList = ({
  droppedItems,
  handleTimeChange,
  handleCheckBoxClick,
  handleRemoveItem,
  handleDrop,
  selectedDate,
  progressValue,
  handleChangeDate,
}) => {
  return (
    <StyledToDoItemContainer>
      <ToDoListHeader date={selectedDate} handleChangeDate={handleChangeDate} />
      <Paragraph text="To do list" />
      <StyledToDoList>
        {Object.entries(droppedItems)?.map(([name, data], index) => (
          <StyledToDoItem key={index}>
            <TaskHeader
              data={data}
              handleTimeChange={handleTimeChange}
              handleCheckBoxClick={handleCheckBoxClick}
            />
            <Categories categories={data.categories} />
            <Button
              type="button"
              text="Remove"
              click={() => handleRemoveItem(index)}
            />
          </StyledToDoItem>
        ))}
      </StyledToDoList>
      <DropZone onDrop={handleDrop} />
      <ProgressBar value={progressValue} max={droppedItems.length} />
    </StyledToDoItemContainer>
  );
};

ToDoList.defaultProps = {};

ToDoList.propTypes = {
  droppedItems: PropTypes.object.isRequired,
  handleTimeChange: PropTypes.func.isRequired,
  handleCheckBoxClick: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  progressValue: PropTypes.number.isRequired,
  handleChangeDate: PropTypes.func.isRequired,
};

export default ToDoList;
