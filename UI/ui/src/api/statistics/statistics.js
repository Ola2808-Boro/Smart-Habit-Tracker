import axios from "axios";
import dayjs from "dayjs";
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

export async function fetchWeeklyProgressStats(startDate) {
  const start = dayjs(startDate).startOf("day");
  const end = start.add(6, "day");

  const formattedStartDate = start.format("YYYY-MM-DD");
  const formattedEndDate = end.format("YYYY-MM-DD");

  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://127.0.0.1:5000/weakly-habit-mood-stats",
    {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response;
}
