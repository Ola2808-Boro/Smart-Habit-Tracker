import "./Notes.styles.js";
import React, { useState } from "react";
import PageTitle from "../../atoms/PageTitle/PageTitle";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import "reactjs-popup/dist/index.css";
import ReactJsAlert from "reactjs-alert";
import CustomPopup from "../../organisms/Popup/Popup";
import NotesList from "../../organisms/NotesList/NotesList";
import { CalendarSection } from "../../organisms/CalendarSection/CalendarSection.js";
import VisibleNotes from "../../molecules/VisibleNotes/VisibleNotes";
import {
  saveAnswerRequest,
  checkNoteLimit,
  saveQuestion,
  retrieveQuestion,
  retrieveNotes,
} from "../../../api/notes/notes";
import { randomQuestionIdx } from "../../../utils/notes/notes";
//min-date

const Notes = () => {
  const [calDate, setCalDate] = useState(new Date());
  const [lastQuestionIdx, setLastQuestionIdx] = useState(0);
  const [question, setQuestion] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [retrievedQandA, setRetrievedQandA] = useState([]);
  const [isOpenQandA, setIsOpenQandA] = useState(false);
  const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false);
  const [visibleNotes, setVisibleNotes] = useState(2);
  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    quote: "",
    type: "info",
  });

  async function handleOpenPopupQandA() {
    const response = await checkNoteLimit();
    if (response["data"]["message"] === "A note has note_id null") {
      await getQuestion();
      setIsOpenQandA(true);
    } else {
      setAlert({
        visible: false,
        title: "Adding notes",
        quote: "Added note today. You can add one note per day.",
        type: "info",
      });
    }
  }

  async function handleClosePopupQandA() {
    setIsOpenQandA(false);
  }

  async function handleClosePopupAddQuestion() {
    setIsOpenAddQuestion(false);
  }

  async function handleSaveAnswer(e) {
    e.preventDefault();
    const response = await saveAnswerRequest();
    setQuestion("");
    setAnswer("");
    handleClosePopupQandA();
  }

  async function onChangeDate(calDate) {
    setCalDate(calDate);
    setVisibleNotes(2);
    const response = await retrieveNotes(calDate);
    setRetrievedQandA(response["data"]["answer_question_date"]);
  }

  async function handleAddQuestion(e) {
    e.preventDefault();
    const response = await saveQuestion(newQuestion);
    handleClosePopupAddQuestion();
  }

  async function getQuestion() {
    const response = await axios.get("http://127.0.0.1:5000/num_of_questions");
    console.log(response);
    if (
      response["data"]["message"] !== "Failed to retrieve number of questions"
    ) {
      const max = response.data.max;
      const random_idx = randomQuestionIdx(max, lastQuestionIdx);
      setLastQuestionIdx(random_idx);
      const response2 = await retrieveQuestion(random_idx);
      setQuestion(response2["data"]["question"]);
    } else {
      return "incorrectly downloaded number of questions";
    }
  }

  return (
    <>
      <PageTitle />
      <>
        <CalendarSection
          value={calDate}
          handleClosePopupAddQuestion={handleClosePopupAddQuestion}
          handleOpenPopupQandA={handleOpenPopupQandA}
          onChange={onChangeDate}
        />
        <NotesList
          retrievedQandA={retrievedQandA}
          visibleNotes={visibleNotes}
        />
        <VisibleNotes
          visibleNotes={visibleNotes}
          retrievedQandA={retrievedQandA}
          setVisibleNotes={setVisibleNotes}
        />
        <ReactJsAlert
          status={alert.visible}
          type={alert.type}
          title={alert.title}
          isQuotes={true}
          quote={alert.quote}
          Close={() => setAlert((prev) => ({ ...prev, visible: false }))}
        />
        <CustomPopup
          type="add-question"
          open={isOpenAddQuestion}
          setIsOpen={setIsOpenAddQuestion}
          handleAdd={handleAddQuestion}
          value={newQuestion}
          setNewValue={setNewQuestion}
        />
        <CustomPopup
          type="question-answer"
          open={isOpenQandA}
          setIsOpen={setIsOpenQandA}
          handleAdd={handleSaveAnswer}
          value={answer}
          setNewValue={setAnswer}
          question={question}
        />
      </>
    </>
  );
};

export default Notes;
