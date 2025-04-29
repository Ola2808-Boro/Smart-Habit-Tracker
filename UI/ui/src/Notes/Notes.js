import './Notes.css';
import React,{ useState } from 'react';
import Calendar from 'react-calendar'
import PageTitle from '../PageTitle/PageTitle';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

//min-date


const Notes = () => {
    const [calDate, setCalDate] = useState(new Date())
    const [lastQuestionIdx,setLastQuestionIdx]=useState(0)
    const [question,SetQuestion]=useState('')
    const [answer,SetAnswer]=useState('')

    async function handleSaveAnswer(e){
        e.preventDefault();
        const response=axios.post('')
    }

    function randomQuestionIdx(max){
        console.log(max,'max')
        let random_idx;
        if (max > 1) {
            do {
                random_idx = Math.floor(Math.random() * max) + 1;
            } while (random_idx === lastQuestionIdx); 
        } else {
            random_idx = 1; 
        }
        setLastQuestionIdx(random_idx)
        return random_idx
    }
    async function onChange (calDate) {
        setCalDate(calDate)
        console.log(calDate,typeof(calDate))
        const response=await axios.post('http://127.0.0.1:5000/notes-read',{'calDate':calDate}, {
            headers: {
            'Content-Type': 'application/json'
        }});
        console.log(`Response onChange calendar: ${response}`)
    }

    async function getQuestion(){
        const response=await axios.get('http://127.0.0.1:5000/num_of_questions');
        console.log(response)
        if (response['data']['message']!=="incorrectly downloaded number of questions"){
            const max=response.data.max
            console.log('max',max)
            const random_idx=randomQuestionIdx(max)
            console.log('randomidx',random_idx)
            const response2=await axios.post('http://127.0.0.1:5000/get_question',{'random_idx': random_idx }, {
                headers: {
                'Content-Type': 'application/json'
            }});
            console.log(response2)

            SetQuestion(response2['data']['question'])
        }
        else{
            return "incorrectly downloaded number of questions"
        }
        
    }


    return(
        <div>
             <PageTitle/>
        <div>
            <Calendar onChange={onChange} value={calDate} />
            <button className='form-button' onClick={getQuestion}>Question</button>
            <div className='q&a-container'>
            {question &&
                <form className='form-card'  onSubmit={handleSaveAnswer}>
                    <p>{question}</p>
                    <input value={answer} className='form-input' type='text'/>
                    <button className='form-button' type='submit'>Save note</button>
                </form>
            }
            </div>
        </div>
        </div>
    )

}

export default Notes;