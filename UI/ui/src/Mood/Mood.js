import './Mood.css';
import React, { useState,useEffect } from 'react';
import PageTitle from '../PageTitle/PageTitle';
import axios from 'axios';
const Mood = () => {
    const [selectedMonth,setSelectedMonth]=useState(new Date().getMonth())
    const [selectedDay,setSelectedDay]=useState(new Date().getDay())
    const [selectedYear,setSelecteYear]=useState(new Date().getFullYear())
    const [selectedMoods,setSelectedMoods]=useState({})
    const [years, setYears] = useState([]);
    const nameOfDays=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const days=[]
    const weekChunks=[]
  
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

    async function setUnactiveMoodDays(){
        setSelectedMoods(prev => {
            const moods={...prev}
            console.log('date',new Date().getDate())
            for (let i=new Date().getDate();i<=totalDays;i+=1){
                console.log(i)
                if(!moods[i]){
                    moods[i]='unactive'
                }
            }   
            return moods
        })
    }
    async function setMoods(day){
        console.log('click')
        setSelectedMoods(prev => ({
            ...prev,
            [day]: 'sad'
        }));
        // setSelectedMoods(prev => {
        //     const moods={...prev}
        //     console.log('date',new Date().getDate())
        //     for (let i=new Date().getDate();i<=totalDays;i+=1){
        //         console.log(i)
        //         if(!moods[i]){
        //             console.log('change')
        //             moods[i]='unactive'
        //         }
        //     }   
        //     return moods
        // })

        
        setSelectedDay(day)
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
                                    onClick={selectedMoods[day] !== 'unactive' ? () => setMoods(day) : undefined}>
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
                        <div className='mood-legend-type-container'>
                        <div className='mood-type-container sad'></div>
                        <div><p>sad</p></div>
                        </div>
                        <div className='mood-legend-type-container'>
                        <div className='mood-type-container happy'></div>
                        <div><p>happy</p></div>
                        </div>
                        <div className='mood-legend-type-container'>
                        <div className='mood-type-container angry'></div>
                        <div><p>angry</p></div>
                        </div>
                        <div className='mood-legend-type-container'>
                        <div className='mood-type-container neutral'></div>
                        <div><p>neutral</p></div>
                        </div>
                        <div className='mood-legend-type-container'>
                        <div className='mood-type-container anxious'></div>
                        <div><p>anxious</p></div>
                        </div>
                        <div className='mood-legend-type-container'>
                        <div className='mood-type-container excited'></div>
                        <div><p>excited</p></div>
                        </div>
                    </div>
                    </div>


            </div>
        </div>
        </>
    )

}

export default Mood;