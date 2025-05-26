import './Mood.css';
import React, { useState,useEffect } from 'react';
import PageTitle from '../Components/PageTitle/PageTitle';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { HexColorPicker } from "react-colorful";

const Mood = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [selectedMonth,setSelectedMonth]=useState(months[new Date().getMonth()]);
    const [selectedDay,setSelectedDay]=useState(new Date().getDay());
    const [selectedYear,setSelecteYear]=useState(new Date().getFullYear());
    const [selectedMoods,setSelectedMoods]=useState({});
    const [years, setYears] = useState([]);
    const [moodOptions, setMoodOptions] = useState([]);
    const [isMoodPopupOpen, setIsMoodPopupOpen]=useState(false);
    const [isAddMoodLegendOpen, setIsAddMoodLegendOpen]=useState(false);
    const [newMoodColor, setNewMoodColor] = useState('#aabbcc');
    const [newMoodName, setNewMoodName] = useState('');
    const [visibleLegendOptions,setVisibleLegendOptions]=useState(10)

    const nameOfDays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const days=[]
    const weekChunks=[]
    const firstDay=new Date(selectedYear,new Date().getMonth()).getDay()
    const totalDays = daysInMonth(selectedYear, new Date().getMonth());
    


    function daysInMonth(year,month){
        return new Date(year,month+1,0).getDate()
    }

    async function getMoodLegendData(){
        const token=localStorage.getItem('token')
        const response=await axios.get('http://127.0.0.1:5000/get-mood-option', {
            headers: {
            'Authorization':token
            }});
        setMoodOptions(response.data['mood_option'])
    }
    async function addMoodToLegend(e){
        e.preventDefault();
        const token=localStorage.getItem('token')
        console.log('Click')
        const response=await axios.post('http://127.0.0.1:5000/add-new-mood-option',{'newMoodOption':newMoodName,'newMoodOptionColor':newMoodColor}, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization':token
            }});
        setIsAddMoodLegendOpen(false)
        setMoodOptions(prev => ([
            ...prev,
            [newMoodName,newMoodColor]
        ]));
        setNewMoodName('')
        setNewMoodColor('')
    }
    async function handleOpenAddMoodLegendPopup(){
        setIsAddMoodLegendOpen(true)
    }

    async function setInactiveMoodDays(currentDate){
        setSelectedMoods(prev => {
            const newState = { ...prev };
            if (!newState[selectedYear]) newState[selectedYear] = {};
            if (!newState[selectedYear][selectedMonth]) newState[selectedYear][selectedMonth] = {};
            for (let i=1;i<=totalDays;i+=1){
                if(!newState[selectedYear][selectedMonth][i] && i!==currentDate){
                    newState[selectedYear][selectedMonth][i] = {
                        'mood':'inactive',
                        'color':'gray'
                    };
                    console.log(newState[selectedYear][selectedMonth][i])
                }
                
            }
            return newState;
        })

       
    }
    async function setMoods(day){
        console.log('click')
        setSelectedDay(day)
        setIsMoodPopupOpen(true)
    }
    async function handleAddMood(e) {
        e.preventDefault();
        console.log(selectedMoods)
        setSelectedMoods(prev => {
            const newState = { ...prev };
            if (!newState[selectedYear]) newState[selectedYear] = {};
            if (!newState[selectedYear][selectedMonth]) newState[selectedYear][selectedMonth] = {};
            newState[selectedYear][selectedMonth][selectedDay] = {'mood':e.target.dataset.mood,'color':e.target.dataset.color};
            return newState;
        })
        console.log(selectedMoods)
    }
    async function updateMood(e){
        e.preventDefault();
        const token=localStorage.getItem('token')
        const day=selectedDay
        const mood=selectedMoods[selectedYear][selectedMonth][day].mood
        console.log(token,mood)
        const response=await axios.post('http://127.0.0.1:5000/update-mood',{'selectedMood':mood},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        console.log(response)
        setIsMoodPopupOpen(false)
      
    }
    async function getJoinedDate(){
        const token=localStorage.getItem('token')
        const response=await axios.get('http://127.0.0.1:5000/check-joined-date',{
            headers: {
                'Authorization': token
            }
        })
        const dateJoinYear=new Date(response['data']['date_join']).getFullYear()
        const years=[]
        for (let i=selectedYear;i>=dateJoinYear;i-=1){
            years.push(i)
        }
        setYears(years)
 
    }

    async function getMoodData(){
        console.log('Get mood data')
        const token=localStorage.getItem('token')
        const response=await axios.get('http://127.0.0.1:5000/retrieved-mood-data',{
            headers: {
                'Authorization': token
            }
        })
        console.log('Mood ',response)
        const newMoods = { ...selectedMoods };

        response.data['mood_data']?.forEach(([mood_id, dateStr, mood,color]) => {
            const date = new Date(dateStr);
            const y = date.getFullYear();
            const m = months[date.getMonth()];
            const d = date.getDate();

            if (!newMoods[y]) newMoods[y] = {};
            if (!newMoods[y][m]) newMoods[y][m] = {};
            newMoods[y][m][d] = {'mood':mood,'color':color};
        });

        setSelectedMoods(newMoods);

 
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

    useEffect(() => {
        const today = new Date().getDate();
        const fetchData = async () => {
            await getMoodLegendData();
            await getMoodData();
            await setInactiveMoodDays(today); 
            await getJoinedDate();
        };

        fetchData();
    }, []);

    useEffect(()=>{
        const today = new Date().getDate();
         const fetchData = async () => {
            await getMoodData();
            await setInactiveMoodDays(today); 
        };

        fetchData();

    },[selectedMonth,selectedYear]);
        
    useEffect(() => {
        console.log('selectedMoods updated:', selectedMoods);
    }, [selectedMoods]);


    return(
        <>
        <PageTitle/>
        <div className='mood-container'>
            <div className='mood-tracker-container'>
                <div className='mood-tracker-container-options'>
                    <select className="select-option" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
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
                            
                               week.map((day, dayIndex) => (
                                    <div key={dayIndex}  className={`mood-tracker-day`} style={{backgroundColor:selectedMoods?.[selectedYear]?.[selectedMonth]?.[day]?.color}}
                                    onClick={day===new Date().getDate() ? () => setMoods(day) : undefined}>
                                    {day ? day : ''}
                                </div>
                                ))
                            }
                        </div>
                     ))
                    }

            </div>
                
                    <div className='mood-legend'>
                        <div className='mood-legend-p-container'><p>Moods:</p></div>
                        <div className='mood-legend-container'>
                            {
                                moodOptions.slice(0,visibleLegendOptions).map(([mood,color],index)=>{
                                    return(
                                        <div key={index} className='mood-legend-type-container'>
                                            <div className={`mood-type-container`} data-mood={mood} data-color={color} style={{backgroundColor:color}}></div>
                                            <div><p>{mood}</p></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {visibleLegendOptions < moodOptions.length && (
                                    <div className='more-notes-container'>
                                        <button className='form-button' onClick={() => setVisibleLegendOptions(visibleLegendOptions + 6)}>
                                            See more
                                        </button>
                                    </div>
                                )}
                        <button className='form-button' onClick={handleOpenAddMoodLegendPopup}>Add mood type</button>
                    </div>
                    <Popup open={isMoodPopupOpen} onClose={() => setIsMoodPopupOpen(false)} modal>
                            <form className='form-card' onSubmit={updateMood}>
                                <p className='form-question'>Add mood</p>
                            <div className='mood-legend-container'>
                                {moodOptions.slice(0,visibleLegendOptions).map(([mood,color],index)=>{
                                return(
                                    <div key={index} className='mood-legend-type-container' onClick={handleAddMood}>
                                        <div className={`mood-type-container`} data-mood={mood} data-color={color} style={{backgroundColor:color}} ></div>
                                        <div><p>{mood}</p></div>
                                    </div>
                                )
                                })
                                }
                                {visibleLegendOptions < moodOptions.length && (
                                    <div className='more-notes-container'>
                                        <button className='form-button'  type="button" onClick={() => setVisibleLegendOptions(visibleLegendOptions + 6)}>
                                            See more
                                        </button>
                                    </div>
                                )}
                            </div>
                            <button className='form-button' type='submit'>Save mood</button>
                        </form>
                         
                           
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
                            <button className='form-button' type='submit'>Save mood type</button>
                        </form>
                    </Popup> 

            </div>
      
        </>
    )

}

export default Mood;