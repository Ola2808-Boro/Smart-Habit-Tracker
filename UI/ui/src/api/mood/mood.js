import axios from "axios";

export async function getMoodLegendData() {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:5000/get-mood-option", {
    headers: {
      Authorization: token,
    },
  });
  return response;
}

export async function addNewMoodLegendData(newMoodName, newMoodColor) {
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

export async function getMoodData() {
  console.log("Get mood data");
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

export async function getJoinedDateData() {
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
