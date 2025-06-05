import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons';import React from 'react';
import PropTypes from 'prop-types';
import { StyledIcon } from './Icon.styles';

const Icon = ({
    type,
    handleChangeDate
}) => {
    if(type==='left-arrow'){
        return (
        <StyledIcon  data-arrow='left' onClick={e=>handleChangeDate(e)}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </StyledIcon>
        
        )
    }
    else if(type==='right-arrow'){
        return (
            <StyledIcon data-arrow='right' onClick={e=>handleChangeDate(e)}>
                <FontAwesomeIcon icon={faArrowRight}  />
            </StyledIcon>
        
        )
    }

  
};

Icon.defaultProps={

};

Icon.propTypes = {

};

export default Icon;