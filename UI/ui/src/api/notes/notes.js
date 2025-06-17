import axios from "axios";

export async function saveAnswerRequest(answer, lastQuestionIdx) {
  const response = await axios.post(
    "http://127.0.0.1:5000/save-answer",
    { answer: answer, question_id: lastQuestionIdx },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}

export async function retrieveQuestion(random_idx) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://127.0.0.1:5000/get_question",
    { random_idx: random_idx },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response;
}

export async function saveQuestion(newQuestion) {
  const response = await axios.post(
    "http://127.0.0.1:5000/add-question",
    { new_question: newQuestion },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}

export async function retrieveNotes(calDate) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://127.0.0.1:5000/notes-read",
    { calDate: calDate },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response;
}

export async function checkNoteLimit() {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://127.0.0.1:5000/check-answer-exists",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
}
