import React from 'react';
import PropTypes from 'prop-types';
import { StyledTaskHeader } from './TaskHeader.styles';
import Input from '../../atoms/Input/Input';
import Paragraph from '../../atoms/Paragraph/Paragraph'
const TaskHeader = ({
    data,
    handleTimeChange,
    handleCheckBoxClick
}) => {
  return (
    <StyledTaskHeader
    >
      <Input type='checkbox' checked={data.done} data={data.task} onChange={handleCheckBoxClick}/>
      <Paragraph text={data.task} checked={data.done}/>
      <Input type='time' value={data.time || ''} data={data.task} onChange={(e) =>handleTimeChange(data.task, e.target.value)}/>
    </StyledTaskHeader>
  );
};

TaskHeader.defaultProps={

};

TaskHeader.propTypes = {

};

export default TaskHeader;