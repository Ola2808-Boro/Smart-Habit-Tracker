import React from 'react';
import PropTypes from 'prop-types';
import { StyledHabitList } from './HabitList.styles';
import DragItem from '../DragItem/DragItem.js'
import Button from '../../atoms/Button/Button';

const HabitList = ({
  habits,
  setIsHabitPopupOpen,
  setIsCategoryPopupOpen
}) => {
  return (
    <>
    <StyledHabitList>
      {habits && Object.entries(habits)?.map(([name, data], index) => (
        <DragItem name={data.habit} categories={data.categories} />
        ))}
    </StyledHabitList>
    <Button type='button' size='big' text='+ Add habit' click={() => setIsHabitPopupOpen(true)}/>
    <Button type='button' size='big' text='+ Add category' click={() => setIsCategoryPopupOpen(true)}/>
    </>
    
  );
};

HabitList.defaultProps={

};

HabitList.propTypes = {

};

export default HabitList;