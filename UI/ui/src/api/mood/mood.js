import axios from "axios";

export async function fetchMoodLegendData() {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:5000/get-mood-option", {
    headers: {
      Authorization: token,
    },
  });
  return response;
}

export async function createMoodOption(newMoodName, newMoodColor) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://127.0.0.1:5000/add-new-mood-option",
    { newMoodOption: newMoodName, newMoodOptionColor: newMoodColor },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response;
}

export async function fetchMoodData() {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://127.0.0.1:5000/retrieved-mood-data",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
}

export async function fetchJoinedDateData() {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:5000/check-joined-date", {
    headers: {
      Authorization: token,
    },
  });
  return response;
}

export async function updateMoodData(mood) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://127.0.0.1:5000/update-mood",
    { selectedMood: mood },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response;
}
