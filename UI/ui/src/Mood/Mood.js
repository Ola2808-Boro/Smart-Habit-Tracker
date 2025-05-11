import './Mood.css';
import React, { useState } from 'react';
import PageTitle from '../PageTitle/PageTitle';
const Mood = () => {
    const [selectedMonth,setSelectedMonth]=useState(new Date().getMonth())
    const [selectedDay,setSelectedDay]=useState(new Date().getDay())
    const [selectedYear,setSelecteYear]=useState(new Date().getFullYear())
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

    for (let i=0;i<firstDay;i++){
        days.push(null)
    }
    for (let i=0;i<=totalDays;i++){
        days.push(i)
    }
    for(let i=0;i<days.length;i+=7){
        weekChunks.push(days.slice(i,i+7));
    }

    console.log(days)
    return(
        <>
        <PageTitle/>
        <div className='mood-container'>
            <div className='mood-tracker-container'>
                <select className="month-select" value={selectedMonth} onChange={setSelectedMonth}>
                    {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                    ))}
                </select>
                <select className="years-select" value={selectedYear} onChange={selectedYear}>
                    {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                    ))}
                </select>
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
                                    <div key={dayIndex} className='mood-tracker-day'>
                                    {day ? day : ''}
                                </div>
                                ))
                            }
                        </div>
                     ))
                    }
            </div>
        </div>
        </>
    )

}

export default Mood;