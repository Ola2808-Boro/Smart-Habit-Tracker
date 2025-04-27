import './Notes.css';
import React,{ useState } from 'react';
import Calendar from 'react-calendar'
import PageTitle from '../PageTitle/PageTitle';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
//min-date


const Notes = () => {
    const [calDate, setCalDate] = useState(new Date())

    function onChange (calDate) {
        setCalDate(calDate)
        console.log(calDate,typeof(calDate))
        const response=axios.post('http://127.0.0.1:5000/notes-read',calDate, {
            headers: {
            'Content-Type': 'application/json'
        }});
        console.log(`Response onChange calendar: ${response}`)
    }


    return(
        <div>
             <PageTitle/>
        <div>
            <Calendar onChange={onChange} value={calDate} />
        </div>
        </div>
    )

}

export default Notes;