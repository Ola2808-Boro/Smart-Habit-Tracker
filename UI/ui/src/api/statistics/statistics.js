import axios from "axios";

export async function fetchCategoriesStatistsics() {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:5000/categories-stats", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
}

export async function fetchMoodsStatistsics() {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:5000/mood-stats", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
}

export async function fetchWeeklyProgressStats() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek);
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = today.toISOString().split("T")[0];
  const token = localStorage.getItem("token");
  const response = axios.post(
    "http://127.0.0.1:5000/weakly-habit-mood-stats",
    { startDate: formattedStartDate, endDate: formattedEndDate },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
}
