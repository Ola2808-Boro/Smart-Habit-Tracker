import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
const CustomPopup = ({
    open,
    value,
    categories,
    type, 
    setNewValue,
    handleSelectCategory,
    setIsOpen,
    handleAdd
}) => {
    if(type==='save-habit'){
        return(
        <Popup open={open} onClose={() => setIsOpen(false)} modal>
            <form className='form-card' onSubmit={handleAdd}>
                <Paragraph text='Add habit'/>
                <Input type='text' value={value} maxLength={30} onChange={e=>{setNewValue(e.target.value)}}/>
                <div className='categories-container'>
                    {
                        Object.entries(categories)?.map(([category, isSelected], index) => (
                        <div
                            className={`category ${isSelected ? 'selected' : ''}`}
                            key={index}
                            data-category={category}
                            onClick={handleSelectCategory}>
                        {category}
                        </div>))}
                </div>
                <Button type='submit' text='Save habit'/>
            </form>
        </Popup>
        )
    }
  else if(type==='save-category'){
    return(<Popup open={open} onClose={() => setIsOpen(false)} modal>
        <form className='form-card' onSubmit={handleAdd}>
            <Paragraph text='Add category'/>
            <Input type='text' value={value} maxLength={20} onChange={e=>{setNewValue(e.target.value)}}/>
            <Button type='submit' text='Save category'/>
        </form>
    </Popup>  )
  }
};

CustomPopup.defaultProps={

};

CustomPopup.propTypes = {

};

export default CustomPopup;