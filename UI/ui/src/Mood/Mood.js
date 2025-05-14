import './Mood.css';
import React, { useState,useEffect } from 'react';
import PageTitle from '../PageTitle/PageTitle';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { HexColorPicker } from "react-colorful";

const Mood = () => {
    const [selectedMonth,setSelectedMonth]=useState(new Date().getMonth());
    const [selectedDay,setSelectedDay]=useState(new Date().getDay());
    const [selectedYear,setSelecteYear]=useState(new Date().getFullYear());
    const [selectedMoods,setSelectedMoods]=useState({});
    const [years, setYears] = useState([]);
    const [isMoodPopupOpen, setIsMoodPopupOpen]=useState(false);
    const [isAddMoodLegendOpen, setIsAddMoodLegendOpen]=useState(false);
    const [newMoodColor, setNewMoodColor] = useState('#aabbcc');
    const [newMoodName, setNewMoodName] = useState('');

    const nameOfDays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const days=[]
    const weekChunks=[]
    const moods=["sad","angry","happy","neutral","anxious","excited"]
    const firstDay=new Date(selectedYear,selectedMonth).getDay()
    const totalDays = daysInMonth(selectedYear, selectedMonth);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];


    console.log(selectedDay,selectedMonth,selectedYear,firstDay)

    function daysInMonth(year,month){
        return new Date(year,month+1,0).getDate()
    }

    async function addMoodToLegend(){
        const token=localStorage.getItem('token')
            const response=await axios.post('http://127.0.0.1:5000/add-new-mood-options',{'newMoodOption':newMoodName,'newMoodOptionColor':newMoodColor}, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization':token
            }});
    }
    async function handleOpenAddMoodLegendPopup(){
        console.log(newMoodName,newMoodColor)
        setIsAddMoodLegendOpen(true)
    }

    async function setUnactiveMoodDays(){
        setSelectedMoods(prev => {
            const moods={...prev}
            console.log('date',new Date().getDate())
            for (let i=new Date().getDate()+1;i<=totalDays;i+=1){
                console.log(i)
                if(!moods[i]){
                    moods[i]='inactive'
                }
            }   
            return moods
        })
    }
    async function setMoods(day){
        console.log('click')
        setSelectedDay(day)
        setIsMoodPopupOpen(true)
        setSelectedMoods(prev => ({
            ...prev,
            [day]: 'sad'
        }));

        
        setSelectedDay(day)
    }
    async function handleAddMood(e) {
        console.log(`Submit ${e.target.dataset.mood}`)
        console.log(selectedMoods)
         setSelectedMoods(prev => ({
            ...prev,
            [selectedDay]: e.target.dataset.mood
        }));
        console.log(selectedMoods)

    }
    async function getJoinedDate(){
        const token=localStorage.getItem('token')
        console.log(token)
        const response=await axios.get('http://127.0.0.1:5000/check-joined-date',{
            headers: {
                'Authorization': token
            }
        })
        const dateJoinYear=new Date(response['data']['date_join']).getFullYear()
        console.log(selectedYear,dateJoinYear)
        const years=[]
        for (let i=selectedYear;i>=dateJoinYear;i-=1){
            years.push(i)
        }
        setYears(years)
        setUnactiveMoodDays()
 
    }

    for (let i=0;i<firstDay;i++){
        days.push(null)
    }
    for (let i=0;i<=totalDays;i++){
        days.push(i)
    }
    for(let i=0;i<days.length;i+=7){
        weekChunks.push(days.slice(i,i+7));
    }

    useEffect(()=>{
        getJoinedDate()
    },[])

    useEffect(() => {
    console.log('selectedMoods updated:', selectedMoods);
    }, [selectedMoods]);



    return(
        <>
        <PageTitle/>
        <div className='mood-container'>
            <div className='mood-tracker-container'>
                <div className='mood-tracker-container-options'>
                    <select className="select-option" value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                    {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                    ))}
                </select>
                <select className="select-option" value={selectedYear} onChange={(e) => setSelecteYear(Number(e.target.value))}>
                    {years.map((year, index) => (
                    <option key={index} value={year}>{year}</option>
                    ))}
                </select>
                </div>
                <div className='mood-tracker-days-name'>
                    {nameOfDays.map((dayName, idx) => (
                                <div key={idx} className='mood-tracker-day-name'>
                                    {dayName}
                                </div>
                            ))} 
                </div>
                {
                    weekChunks.map((week, weekIndex) => (
                        <div key={weekIndex} className='mood-tracker-week-row'>
                            {
                                week.map((day,dayIndex)=>(
                                    <div key={dayIndex} className={`mood-tracker-day ${selectedMoods[day]}`}
                                    onClick={day===new Date().getDate() ? () => setMoods(day) : undefined}>
                                    {day ? day : ''}
                                </div>
                                ))
                            }
                        </div>
                     ))
                    }
               <div>
                    <div>Moods:</div>
                    <div className='mood-legend-container'>
                        {
                            moods.map((mood,index)=>{
                                return(
                                    <div className='mood-legend-type-container'>
                                        <div className={`mood-type-container ${mood}`} data-mood={mood}></div>
                                        <div><p>{mood}</p></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className='form-button' onClick={handleOpenAddMoodLegendPopup}>Add mood</button>
                    </div>
                    <Popup open={isMoodPopupOpen} onClose={() => setIsMoodPopupOpen(false)} modal>
                            <p className='form-question'>Add mood</p>
                            {
                            moods.map((mood,_)=>{
                                return(
                                    <div className='mood-legend-type-container' onClick={handleAddMood}>
                                        <div className={`mood-type-container ${mood}`} data-mood={mood}></div>
                                        <div><p>{mood}</p></div>
                                    </div>
                                )
                                })
                            }
                    </Popup> 
                    <Popup open={isAddMoodLegendOpen} onClose={() => setIsAddMoodLegendOpen(false)} modal>
                            <form className='form-card' onSubmit={addMoodToLegend}>
                            <p className='form-question'>Add mood</p>
                            <HexColorPicker color={newMoodColor} onChange={setNewMoodColor} />
                            <textarea
                                value={newMoodName}
                                className='form-input'
                                maxLength={255}
                                onChange={e => {
                                    setNewMoodName(e.target.value);
                                    e.target.style.height = 'auto'; 
                                    e.target.style.height = `${e.target.scrollHeight}px`; 
                                }}
                                rows={1}
                                placeholder='mood name'
                            />
                            <button className='form-button' type='submit'>Save mood</button>
                        </form>
                    </Popup> 

            </div>
        </div>
        </>
    )

}

export default Mood;