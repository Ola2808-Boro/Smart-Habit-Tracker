import React from 'react';
import PropTypes from 'prop-types';
import { StyledToDoList,StyledToDoItem } from './ToDoList.styles';
import TaskHeader from '../../molecules/TaskHeader/TaskHeader';
import Categories from '../../molecules/Categories/Categories';
import Button from '../../atoms/Button/Button'
import DropZone from '../../DropZone/DropZone';

const ToDoList = ({
    droppedItems,
    handleTimeChange,
    handleCheckBoxClick,
    handleRemoveItem,
    handleDrop
}) => {
  return (
    <StyledToDoList
    >
     {Object.entries(droppedItems)?.map(([name, data], index) => (
        <StyledToDoItem key={index}>
            <TaskHeader data={data} handleTimeChange={handleTimeChange} handleCheckBoxClick={handleCheckBoxClick}/>
            <Categories categories={data.categories}/>
            <Button text='Remove' click={()=>handleRemoveItem(index)}/>
        </StyledToDoItem>            
        ))}
        <DropZone onDrop={handleDrop} />
    </StyledToDoList>
  );
};

ToDoList.defaultProps={

};

ToDoList.propTypes = {

};

export default ToDoList;