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
