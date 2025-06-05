import React from 'react';
import PropTypes from 'prop-types';
import { StyledProgressBar,StyledProgressBarConatiner } from './ProgressBar.styles';

const ProgressBar = ({
  value,
  max

}) => {
  return (
    <StyledProgressBarConatiner>
        <StyledProgressBar
            value={value}
            max={max}
        />
    </StyledProgressBarConatiner>
 
  );
};

ProgressBar.defaultProps={
  value:0,
  max:0
};

ProgressBar.propTypes = {

    value:PropTypes.number.isRequired,
    max:PropTypes.number.isRequired
};

export default ProgressBar;