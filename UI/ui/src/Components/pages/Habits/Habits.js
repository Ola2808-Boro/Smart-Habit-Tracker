import './Habits.css';
import React, { useEffect, useState,useRef } from 'react';
import PageTitle from '../../atoms/PageTitle/PageTitle.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar.js';
import ReactJsAlert from "reactjs-alert";
import ToDoListHeader from '../../molecules/ToDoListHeader/ToDoListHeader.js';
import ToDoList from '../../organisms/ToDoList/ToDoList.js';
import HabitList from '../../organisms/HabitList/HabitList.js';
import Popup from '../../organisms/Popup/Popup.js'
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
    const selectedDateRef = useRef(selectedDate);


    useEffect(() => {
        const fetchData = async () => {
                await getCategories()
                await getHabits()
                await getTasks()
            };
            fetchData();
        }, []);

    useEffect(() => {
        const fetchData = async () => {
                await getTasks()
                selectedDateRef.current = selectedDate;
            };
            fetchData();
        }, [selectedDate]);
    
    useEffect(() => {
        console.log("Nowe droppedItems:", droppedItems);
        let doneTask=0
        Object.entries(droppedItems)?.forEach(([name, data]) => {
            if (data['done'] === true) {
                doneTask+=1;
            }
        });
        setProgressValue(doneTask)
    }, [droppedItems]);

    async function saveTask(name,time,date) {
        const token=localStorage.getItem('token')
        const response=await axios.post('http://127.0.0.1:5000/save-task',{'task':name,'time':time,'date':date},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        console.log('add task ',response)
    }
    const handleDrop = (item) => {
        if (selectedDateRef.current!==`${months[new Date().getMonth()]} ${new Date().getDate()},${new Date().getFullYear()}`){
            setAlert({
                visible: true,
                title: 'Adding new task',
                quote: 'Cannot add task for past/future todo lists ',
                type: 'warning',
            })
        }
        else{
            setDroppedItems(prev => {
                const newState = [...prev];
                newState.push({'task':item.name,'done':false,'time':'0:00','categories':item.categories});
                console.log('new Task',newState)
                return newState;
            })
            console.log('time: ',item.time)
            saveTask(item.name,'0:00:00',selectedDate)
        }
        
    };

    const handleRemoveItem = (index) => {
        const updatedHabits = [...droppedItems];
        removeTask(updatedHabits[index])
        updatedHabits.splice(index, 1);
        console.log(updatedHabits)
        setDroppedItems(updatedHabits);
        
    };

    async function removeTask(task){
        console.log('task',task)
        const token = localStorage.getItem('token')
       let newDate=new Date(selectedDate)
        const newSelectedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`
        const response=await axios.post('http://127.0.0.1:5000/remove-task',{'task':task.task,'category':task.categories,'selectedDate':newSelectedDate},{
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
        const response=await axios.post('http://127.0.0.1:5000/save-habit',{'habit':newHabit.toLowerCase(),'category':categories_data},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        console.log(response.data.message)
        if (response.data['message']==='Habit already exists'){
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
        if (response.status===204) {
            console.log("No categories found.");
            setCategories({});
            return;
        }
        const newCategories = response.data.category.reduce((acc, category) => {
                acc[category] = false;
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
        console.log('HABITS',response)
        if (response.status===204) {
            console.log("No habits found.");
            setHabits([]);
            return;
        }
        setHabits(response.data.habit)
    }

    async function getTasks(){
        const token = localStorage.getItem('token')
        let newDate=new Date(selectedDate)
        const newSelectedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`
        const response=await axios.post('http://127.0.0.1:5000/get-task',{'selectedDate':newSelectedDate},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        console.log('tasks',response)
        if (response.status===204) {
            console.log("No tasks found.");
           setDroppedItems([]);
            return;
        }
        setDroppedItems(response.data.task)
        const convertedTasks = response.data.task.map(task => ({
        ...task,
        'time': convertPythonTimeToInputTime(task.time)
       
        }));
        setDroppedItems(convertedTasks)
    }

    async function handleAddCategory(e){
        console.log(category,category.toLowerCase())
        e.preventDefault();
        const token = localStorage.getItem('token')
        const response=await axios.post('http://127.0.0.1:5000/save-category',{'category':category.toLowerCase()},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        console.log(response.data.message)
        if (response.data['message']==='Category already exists'){
            console.log('open')
            setAlert({
                visible: true,
                title: 'Adding category',
                quote: 'Category already exists',
                type: 'info',
            })
        }
        else if (response.data['message']==='Added successfully category'){
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
    function convertPythonTimeToInputTime(pythonTimeStr) {
        console.log(pythonTimeStr)
        const [hours, minutes] = pythonTimeStr.split(":");
        const pad = num => String(num).padStart(2, '0');
        console.log('time return by function',`${pad(hours)}:${pad(minutes)}`)
        return `${pad(hours)}:${pad(minutes)}`;
    }
    async function handleTimeChange(taskName, newTime) {
        console.log('task new time',taskName,newTime)
        setDroppedItems(prev =>
            prev.map(task =>
            task.task === taskName
                ? { ...task, time: newTime }
                : task
            )
        );
    }
    async function handleChangeDate(e) {
        console.log('handleChangeDate')
        e.preventDefault()
        const arrow = e.currentTarget.dataset.arrow;
        let newDate=new Date(selectedDate)
        if (`${months[new Date().getMonth()]} ${new Date().getDate()},${new Date().getFullYear()}`===`${months[newDate.getMonth()]} ${newDate.getDate()},${newDate.getFullYear()}` && arrow==='right'){
            console.log('NO')
        }
        else{
            if(arrow==='right'){
                newDate.setDate(newDate.getDate() + 1);
            }
            else{
                newDate.setDate(newDate.getDate() - 1);
            }
            const newSelectedDate=`${months[newDate.getMonth()]} ${newDate.getDate()},${newDate.getFullYear()}`
            console.log('newSelectedDate',newSelectedDate)
            setSelectedDate(newSelectedDate)
        } 
       
    }
    async function handleCheckBoxClick(e){
        if (selectedDateRef.current!==`${months[new Date().getMonth()]} ${new Date().getDate()},${new Date().getFullYear()}`){
            setAlert({
                visible: true,
                title: 'Completion of the task',
                quote: 'Cannot finish the task for past/future todo lists ',
                type: 'warning',
            })
        }
        else{
            const parentDiv=e.target.closest('div')
            const timeInput = parentDiv.querySelector('input[type="time"]');
            const selectedTime = timeInput?.value || '';
            if(selectedTime===''){
                console.log('0:00:00')
                setAlert({
                    visible: true,
                    title: 'Completion of the task',
                    quote: 'Cannot finish the task, time is zero ',
                    type: 'warning',
                })
            }
            else{
                const taskName=e.target.dataset.task
                const isChecked=e.target.checked
                const selectedTime = timeInput?.value || '';
                console.log(taskName,isChecked,selectedTime)
                setDroppedItems(prev => {
                    const newState = prev.map(item => {
                        if (item.task === taskName) {
                            return { ...item, done: isChecked, time: selectedTime };
                        }
                        return item;
                    });
                    console.log('newState',newState)
                    return newState;
                })
                saveTask(taskName,selectedTime,selectedDate)
            }
            
        }
        
        
    }
    
    return(
       <>
        <PageTitle/>
        <div className='main-container'>
        <DndProvider backend={HTML5Backend}>
            <div className='to-do-list-container'>
                <ToDoListHeader date={selectedDate} handleChangeDate={handleChangeDate}/>
                <div className='to-do-list-header'>
                    <p className='to-do-list-header-p' style={{ textAlign: 'left' }}>To do list</p>
                </div>
                <ToDoList
                    droppedItems={droppedItems}
                    handleTimeChange={handleTimeChange}
                    handleCheckBoxClick={handleCheckBoxClick}
                    handleRemoveItem={handleRemoveItem}
                    handleDrop={handleDrop}
                />
                <ProgressBar value={progressValue} max={droppedItems.length}/>
            </div>
            <div className='habits-container'>
                 <div className='to-do-list-header'>
                    <p className='to-do-list-header-p'>Habits</p>
                </div>
                <HabitList habits={habits} setIsHabitPopupOpen={setIsHabitPopupOpen} setIsCategoryPopupOpen={setIsCategoryPopupOpen}/>
               <Popup
                open={isHabitPopupOpen}
                type='save-habit'
                setIsOpen={setIsHabitPopupOpen}
                handleAdd={handleAddHabit}
                handleSelectCategory={handleSelectCategory}
                value={newHabit}
                setNewValue={setNewHabit}
                categories={categories}
               />
                <Popup
                open={isCategoryPopupOpen}
                type='save-category'
                setIsOpen={setIsCategoryPopupOpen}
                handleAdd={handleAddCategory}
                value={category}
                categories={categories}
                handleSelectCategory={handleSelectCategory}
                setNewValue={setCategory}/>
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