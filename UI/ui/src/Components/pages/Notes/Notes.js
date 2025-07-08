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
  getNumberOFQuestion,
  retrieveNotes,
} from "../../../api/notes/notes";
import { randomQuestionIdx } from "../../../utils/notes/notes";
import { MainContainer } from "./Notes.styles.js";

const Notes = () => {
  const [calDate, setCalDate] = useState(new Date());
  const [lastQuestionIdx, setLastQuestionIdx] = useState(0);
  const [question, setQuestion] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [retrievedQandA, setRetrievedQandA] = useState([]);
  const [isOpenQandA, setIsOpenQandA] = useState(false);
  const [isOpenAddQuestion, setIsOpenAddQuestion] = useState(false);
  const [visibleNotes, setVisibleNotes] = useState(6);
  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    quote: "",
    type: "info",
  });

  async function handleOpenPopupQandA() {
    const response = await checkNoteLimit();
    if (response["data"]["exists"]) {
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

  async function handleSaveAnswer(e) {
    e.preventDefault();
    const response = await saveAnswerRequest();
    setQuestion("");
    setAnswer("");
    setIsOpenQandA(false);
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
    setIsOpenAddQuestion(false);
  }

  async function getQuestion() {
    const response = await getNumberOFQuestion();
    if (
      (response["data"]["num_of_questions"] !== 0) &
      (response["status"] === 200)
    ) {
      const max = response["data"]["num_of_questions"];
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
      <MainContainer>
        <CalendarSection
          value={calDate}
          onChange={onChangeDate}
          handleOpenPopupQandA={handleOpenPopupQandA}
          setIsOpenAddQuestion={setIsOpenAddQuestion}
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
      </MainContainer>
    </>
  );
};

export default Notes;
