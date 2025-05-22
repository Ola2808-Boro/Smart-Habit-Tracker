import './Habits.css';
import React, { useEffect, useState } from 'react';
import PageTitle from '../Components/PageTitle/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from '../Components/DragItem/DragItem'
import DropZone from '../Components/DropZone/DropZone.js'
import axios from 'axios';
import Popup from 'reactjs-popup';
import ReactJsAlert from "reactjs-alert";
const Habits = () => {

    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [progressValue,setProgressValue]=useState(0.0)
    const [selectedDate,setSelectedDate]=useState(`${months[new Date().getMonth()]} ${new Date().getDate()},${new Date().getFullYear()}`)
    const [droppedItems, setDroppedItems] = useState({});
    const [isCategoryPopupOpen,setIsCategoryPopupOpen]=useState(false)
    const [isHabitPopupOpen,setIsHabitPopupOpen]=useState(false)
    const [category,setCategory]=useState('')
    const [categories,setCategories]=useState([])
    const [habit,setHabit]=useState('')
    const [alert, setAlert] = useState({
            visible: false,
            title: '',
            quote: '',
            type: 'info',
            });



    useEffect(() => {
        const fetchData = async () => {
                await getCategories()
            };
            fetchData();
        }, []);

    useEffect(() => {
        const fetchData = async () => {
                await getCategories()
            };
            fetchData();
        }, categories);

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

    async function handleSelectCategory(e) {
        console.log(e.target.dataset.category)
    }
    async function handleAddHabit(e){
        console.log(category,category.toLowerCase())
        e.preventDefault();
        const token = localStorage.getItem('token')
        const response=await axios.post('http://127.0.0.1:5000/add-habit',{'habit':habit.toLowerCase(),'category':category},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        console.log(response.data.message)
        if (response.data['message']=='Habit already exists'){
            console.log('open')
            setAlert({
                visible: true,
                title: 'Adding habit',
                quote: 'Habit already exists',
                type: 'info',
            })
        }
        setIsHabitPopupOpen(false)
        setHabit('')
           
    }
    async function getCategories(){
        const token = localStorage.getItem('token')
        const response=await axios.get('http://127.0.0.1:5000/get-category',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        setCategories(response.data.category)
    }
    async function handleAddCategory(e){
        console.log(category,category.toLowerCase())
        e.preventDefault();
        const token = localStorage.getItem('token')
        const response=await axios.post('http://127.0.0.1:5000/add-category',{'category':category.toLowerCase()},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        console.log(response.data.message)
        if (response.data['message']=='Category already exists'){
            console.log('open')
            setAlert({
                visible: true,
                title: 'Adding category',
                quote: 'Category already exists',
                type: 'info',
            })
        }
        else if (response.data['message']=='Added successfully category'){
            setCategories(prev=>[...prev,category.toLowerCase()])
        }
        setIsCategoryPopupOpen(false)
        setCategory('')
           
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

                    <button className='form-button' onClick={() => setIsHabitPopupOpen(true)}>
                        + Add habit
                    </button>
                    <button className='form-button' onClick={() => setIsCategoryPopupOpen(true)}>
                        + Add category
                    </button>
                    <Popup open={isHabitPopupOpen} onClose={() => setIsHabitPopupOpen(false)} modal>
                        <form className='form-card' onSubmit={handleAddHabit}>
                            <p className='form-question'>Add habit</p>
                            <input type='text' value={habit} maxLength={30} onChange={e=>{setHabit(e.target.value)}}/>
                            <div className='categories-container'>
                                {
                                    categories.map((category,index)=>(
                                        <div className='category' key={index} data-category={category}onClick={e=>handleSelectCategory(e)}>
                                            {category}
                                        </div>
                                    ))
                                }
                            </div>
                            <button className='form-button' type='submit'>Save habit</button>
                        </form>
                    </Popup>

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

        <ReactJsAlert
            status={alert.visible}
            type={alert.type}
            title={alert.title}
            isQuotes={true}
            quote={alert.quote}
            Close={() => setAlert(prev => ({ ...prev, visible: false }))}
        />
        
        </div>
       </>
       
    )

}

export default Habits;