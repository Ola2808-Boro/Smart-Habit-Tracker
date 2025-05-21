import './Habits.css';
import React, { useState } from 'react';
import PageTitle from '../Components/PageTitle/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from '../Components/DragItem/DragItem'
import DropZone from '../Components/DropZone/DropZone.js'
import axios from 'axios';
import Popup from 'reactjs-popup';

const Habits = () => {

    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [progressValue,setProgressValue]=useState(0.0)
    const [selectedDate,setSelectedDate]=useState(`${months[new Date().getMonth()]} ${new Date().getDate()},${new Date().getFullYear()}`)
    const [droppedItems, setDroppedItems] = useState({});
    const [isCategoryPopupOpen,setIsCategoryPopupOpen]=useState(false)
    const [category,setCategory]=useState('')


    const handleDrop = (item) => {
        setDroppedItems(prev => {
            const newState = {...prev };
            if (!newState[item.name]) newState[item.name] = {};
            newState[item.name] = {'done':false,'time':0};
            console.log(newState)
            return newState;
        })
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...droppedItems];
        updatedItems.splice(index, 1);
        setDroppedItems(updatedItems);
    };

    async function handleAddCategory(e){
        e.preventDefault();
        const token = localStorage.getItem('token')
        const response=await axios.post('http://127.0.0.1:5000/add-category',{'category':category},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
    }
    async function handleCheckBoxClick(e){
        const taskName=e.target.dataset.task
        const isChecked=e.target.checked

        const parentDiv=e.target.closest('div')
        console.log('parentdiv',parentDiv)
        const timeInput = parentDiv.querySelector('input[type="time"]');
        const selectedTime = timeInput?.value || '';
        console.log(taskName,isChecked,selectedTime)
        setDroppedItems(prev => {
            const newState = { ...prev };
            if (!newState[taskName]) newState[taskName] = {};
            console.log('before',newState[taskName])
            newState[taskName] = {'done':isChecked,'time':selectedTime};
            console.log('after',newState[taskName])
            console.log(newState)
            return newState;
        })
    }
    
    return(
       <>
        <PageTitle/>
        <div className='main-container'>
        <DndProvider backend={HTML5Backend}>
            <div className='to-do-list-container'>
                <div className='to-do-list-date'>
                    <div className='to-do-list-date-arrow'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <p className='to-do-list-date-p'>{selectedDate}</p>
                    <div className='to-do-list-date-arrow'>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                </div>
                <div className='to-do-list-header'>
                    <p className='to-do-list-header-p'>To do list</p>
                </div>
                
                <div className='to-do-list-items'>
                   
                    {Object.entries(droppedItems).map(([name, data], index) => (
                        <div className='to-do-list-item' key={index}>
                            <input type="checkbox" checked={data?.['done']} data-task={name} onChange={handleCheckBoxClick}></input>
                            <p>{name}</p>
                            <input aria-label="Time" type="time" data-task={name} defaultValue={data.time || ''}/>    
                        </div>
                    ))}
                    <DropZone onDrop={handleDrop} />
                                        
                </div>
                <div className='to-do-list-progress-bar-container'>
                    <progress value={progressValue} className='to-do-list-progress-bar'/>
                </div>
            </div>
            <div className='habits-container'>
                 <div className='to-do-list-header'>
                    <p className='to-do-list-header-p'>Habits</p>
                </div>
                <div className='to-do-list-items'>
                    <DragItem name="Item 1" />
                    <DragItem name="Item 2" />
                    <DragItem name="Item 3" />

                        {/* <div className='to-do-list-item habits'>
                            <p>Heatlh</p>
                        </div>
                    
                    <div className='to-do-list-item habits'>
                        <p>Heatlh</p>
                    </div> */}

                    <button className='form-button' >
                        + Add habit
                    </button>
                    <button className='form-button' onClick={() => setIsCategoryPopupOpen(true)}>
                        + Add category
                    </button>
                    <Popup open={isCategoryPopupOpen} onClose={() => setIsCategoryPopupOpen(false)} modal>
                        <form className='form-card' onSubmit={handleAddCategory}>
                            <p className='form-question'>Add category</p>
                            <input type='text' value={category} maxLength={20} onChange={e=>{setCategory(e.target.value)}}/>
                            <button className='form-button' type='submit'>Save category</button>
                        </form>
                    </Popup> 
                </div>
            </div>
        </DndProvider>
        </div>
       </>
       
    )

}

export default Habits;