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
    const [droppedItems, setDroppedItems] = useState([]);
    const [isCategoryPopupOpen,setIsCategoryPopupOpen]=useState(false)
    const [isHabitPopupOpen,setIsHabitPopupOpen]=useState(false)
    const [category,setCategory]=useState('')
    const [categories,setCategories]=useState({})
    const [newHabit,setNewHabit]=useState('')
    const [habits,setHabits]=useState([])
    const [alert, setAlert] = useState({
            visible: false,
            title: '',
            quote: '',
            type: 'info',
            });



    useEffect(() => {
        const fetchData = async () => {
                await getCategories()
                await getHabits()
                await getTasks()
            };
            fetchData();
        }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //             await getCategories()
    //         };
    //         fetchData();
    //     }, categories);

    async function saveTask(name,time) {
        const token=localStorage.getItem('token')
        const response=await axios.post('http://127.0.0.1:5000/save-task',{'task':name,'time':'0 seconds'},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        console.log('add task ',response)
    }
    const handleDrop = (item) => {
        setDroppedItems(prev => {
            const newState = [...prev];
            newState.push({'habit':item.name,'done':false,'time':0,'categories':item.categories});
            console.log('new Task',newState)
            return newState;
        })

        saveTask(item.name,0)
    };

    const handleRemoveItem = (index) => {
        const updatedHabits = [...droppedItems];
        removeTask(updatedHabits[index])
        updatedHabits.splice(index, 1);
        console.log(updatedHabits)
        setDroppedItems(updatedHabits);
        
    };

    async function removeTask(habit){
        console.log('habit',habit)
        const token = localStorage.getItem('token')
        const response=await axios.post('http://127.0.0.1:5000/remove-task',{'task':habit.habit,'category':habit.categories},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
    }
    async function handleSelectCategory(e) {
        console.log(e.target.dataset.category)
        setCategories(prev=>{
            const newState = { ...prev };
            newState[e.target.dataset.category]=true;
            console.log('newState',newState)
            return newState
        })


    }
    async function handleAddHabit(e){
        console.log(category,category.toLowerCase())
        e.preventDefault();
        const token = localStorage.getItem('token')
        const categories_data=[]
        for (const [key, value] of Object.entries(categories)) {
            if(value===true){
                categories_data.push(key)
            }
        } 
        const response=await axios.post('http://127.0.0.1:5000/add-habit',{'habit':newHabit.toLowerCase(),'category':categories_data},{
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
        setNewHabit('')
        const newState = Object.fromEntries(
        Object.keys(categories).map(key => [key, false])
        );
        setCategories(newState);
           
    }
    async function getCategories(){
        const token = localStorage.getItem('token')
        const response=await axios.get('http://127.0.0.1:5000/get-category',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        
        const newCategories = response.data.category.reduce((acc, category) => {
            acc[category] = false;
            console.log('acc',acc)
            return acc;
            }, {});
        setCategories(newCategories);
    
    }
    async function getHabits(){
        const token = localStorage.getItem('token')
        const response=await axios.get('http://127.0.0.1:5000/get-habit',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        console.log('HABITS',response.data.habit)
        setHabits(response.data.habit)
    }

    async function getTasks(){
        const token = localStorage.getItem('token')
        const response=await axios.get('http://127.0.0.1:5000/get-task',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        console.log('tasks',response.data.task)
        setDroppedItems(response.data.task)
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
            setCategories(prev=>{
                const newState = { ...prev };
                newState[category]=false;
                console.log('newState',newState)
                return newState
            })
        }
        setIsCategoryPopupOpen(false)
        setCategory('')
           
    }
    async function handleCheckBoxClick(e){
        const taskName=e.target.dataset.task
        const isChecked=e.target.checked

        const parentDiv=e.target.closest('div')
        const timeInput = parentDiv.querySelector('input[type="time"]');
        const selectedTime = timeInput?.value || '';
        console.log(taskName,isChecked,selectedTime)
        setDroppedItems(prev => {
            const newState = { ...prev };
            if (!newState[taskName]) newState[taskName] = {};
            newState[taskName] = {'done':isChecked,'time':selectedTime};
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
                   
                    {Object.entries(droppedItems)?.map(([name, data], index) => (
                        <div className='to-do-list-item' key={index}>
                            <div className='to-do-list-item-container'>
                                <input type="checkbox" checked={data?.['done']} data-task={data.habit} onChange={handleCheckBoxClick}></input>
                                <p>{data.habit}</p>
                                <input aria-label="Time" type="time" data-task={data.habit} defaultValue={data.time || ''}/>    
                            </div>
                            <div className='categories'>
                                    {
                                    data?.categories.map((category,index)=>(
                                        <div key={index} className='category'>
                                            {category}
                                        </div>
                                   ))
                                }
                                </div>
                            <button onClick={
                                () => handleRemoveItem(index)}>
                                Remove
                            </button>
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
                    {Object.entries(habits)?.map(([name, data], index) => (
                        <DragItem name={data.habit} categories={data.categories} />
                    ))}
                    <button className='form-button' onClick={() => setIsHabitPopupOpen(true)}>
                        + Add habit
                    </button>
                    <button className='form-button' onClick={() => setIsCategoryPopupOpen(true)}>
                        + Add category
                    </button>
                    <Popup open={isHabitPopupOpen} onClose={() => setIsHabitPopupOpen(false)} modal>
                        <form className='form-card' onSubmit={handleAddHabit}>
                            <p className='form-question'>Add habit</p>
                            <input type='text' value={newHabit} maxLength={30} onChange={e=>{setNewHabit(e.target.value)}}/>
                            <div className='categories-container'>
                                {
                                    Object.entries(categories)?.map(([category, isSelected], index) => (
                                    <div
                                        className={`category ${isSelected ? 'selected' : ''}`}
                                        key={index}
                                        data-category={category}
                                        onClick={handleSelectCategory}
                                    >
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