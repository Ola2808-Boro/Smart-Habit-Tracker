import axios from "axios";

export async function saveTaskRequest(name, time, date, done) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://127.0.0.1:5000/save-task",
    { task: name, time: time, date: date, done: done },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
}

export async function removeTaskRequest(task, selectedDate) {
  const token = localStorage.getItem("token");
  let newDate = new Date(selectedDate);
  const newSelectedDate = `${newDate.getFullYear()}-${String(
    newDate.getMonth() + 1
  ).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`;
  const response = await axios.post(
    "http://127.0.0.1:5000/remove-task",
    {
      task: task.task,
      category: task.categories,
      selectedDate: newSelectedDate,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
}

export async function saveHabitRequest(categories, newHabit) {
  const token = localStorage.getItem("token");
  const categories_data = [];
  for (const [key, value] of Object.entries(categories)) {
    if (value === true) {
      categories_data.push(key);
    }
  }
  const response = await axios.post(
    "http://127.0.0.1:5000/save-habit",
    { habit: newHabit.toLowerCase(), category: categories_data },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response;
}

export async function retrieveCategoriesRequest() {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:5000/get-category", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
}

export async function retrieveHaibtsRequest() {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:5000/get-habit", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
}

export async function retrieveTasksRequest(newSelectedDate) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://127.0.0.1:5000/get-task",
    { selectedDate: newSelectedDate },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response;
}

export async function addCategoryRequest(category) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://127.0.0.1:5000/save-category",
    { category: category.toLowerCase() },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response;
}

export async function retrieveWeaklyProgressStatsRequest() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek);
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = today.toISOString().split("T")[0];
  const token = localStorage.getItem("token");
  console.log("aaaa", formattedStartDate, formattedEndDate);
  const response = axios.post(
    "http://127.0.0.1:5000/weakly-progress-stats",
    { startDate: formattedStartDate, endDate: formattedEndDate },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
}
