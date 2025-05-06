import './Notes.css';
import React,{ use, useState } from 'react';
import Calendar from 'react-calendar'
import PageTitle from '../PageTitle/PageTitle';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

//min-date


const Notes = () => {
    const [calDate, setCalDate] = useState(new Date())
    const [lastQuestionIdx,setLastQuestionIdx]=useState(0)
    const [question,setQuestion]=useState('')
    const [newQuestion,setNewQuestion]=useState('')
    const [answer,setAnswer]=useState('')
    const [retreivedQandA,setRetreivedQandA]=useState([])
    const [isOpenQandA, setIsOpenQandA] = useState(false)
    const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false)
    const [visibleNotes,setVisibleNotes]=useState(2)

    async function handleOpenPopupQandA() {
        await getQuestion();  
        setIsOpenQandA(true);      
    }

    async function handleClosePopupQandA(){
        setIsOpenQandA(false)
    }

    async function handleOpenPopupAddQuestion() {
        setIsOpenAddQuestion(true);      
    }

    async function handleClosePopupAddQuestion(){
        setIsOpenAddQuestion(false)
    }

    async function handleSaveAnswer(e){
        e.preventDefault();
        console.log('Add')
        const response=await axios.post('http://127.0.0.1:5000/save-answer',{'answer':answer,'question_id':lastQuestionIdx},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setQuestion('')
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
        console.log(`Response onChange calendar: ${response['data']}`)
        setRetreivedQandA(response['data']["answer_question_date"])
        console.log(retreivedQandA)
    }

    async function handleAddQuestion(e){
        e.preventDefault();
        const response=await axios.post('http://127.0.0.1:5000/add-question',{'new_question':newQuestion},{
            headers: {
            'Content-Type': 'application/json'
        }});
        console.log(response['data'])
        handleClosePopupAddQuestion()
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

            setQuestion(response2['data']['question'])
        }
        else{
            return "incorrectly downloaded number of questions"
        }
        handleClosePopupQandA()
        
    }


    return(
        <>
             <PageTitle/>
        <div>
            <div className='calandera-note-container'>
                <Calendar onChange={onChange} value={calDate} selectRange={true}/>
                <div className='q-a-container'>
                    <Popup open={isOpenAddQuestion} onClose={() => setIsOpenAddQuestion(false)} modal>
                        <form className='form-card' onSubmit={handleAddQuestion}>
                            <p>Add question</p>
                            <input value={newQuestion} className='form-input' type='text'
                            onChange={e=>setNewQuestion(e.target.value)}
                            />
                            <button className='form-button' type='submit'>Save question</button>
                        </form>
                    </Popup>
                    <Popup open={isOpenQandA} onClose={() => setIsOpenQandA(false)} modal>
                        <form className='form-card' onSubmit={handleSaveAnswer}>
                            <p>{question}</p>
                            <input value={answer} className='form-input' type='text'
                            onChange={e=>setAnswer(e.target.value)}
                            />
                            <button className='form-button' type='submit'>Save note</button>
                        </form>
                    </Popup>

                    <button className='form-button' onClick={handleOpenPopupQandA}>Question</button>
                    <button className='form-button' onClick={handleOpenPopupAddQuestion}>Add question</button>
                  
                </div>
            </div>
            <div className='retrived-notes-conatiner'>
                {retreivedQandA && 
                        retreivedQandA.slice(0,visibleNotes).map((item, index) => {
                        console.log(item,index)
                        return (
                            <div key={index} className='retrived-note'>
                                <div  className='retrived-note-question'><p>{item[0]}</p> <div className='retrived-note-date'>{item[2].split(',')[1].slice(0,12)}</div></div>
                                <div className='retrived-note-answer'><p>{item[1]}</p></div>
                            </div>
                        );
                    })
                }
            </div>
            {visibleNotes < retreivedQandA.length && (
                    <div className='more-notes-container'>
                        <button className='form-button' onClick={() => setVisibleNotes(visibleNotes + 6)}>
                            See more
                        </button>
                    </div>
                )}

        </div>
        </>
    )

}

export default Notes;