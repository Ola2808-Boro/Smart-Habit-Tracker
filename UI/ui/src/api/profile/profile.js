import axios from "axios";

export async function createAvatarImage(image) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://127.0.0.1:5000/update-avatar-image",
    { image: image },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response;
}

export async function createUserData(image) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://127.0.0.1:5000/update-user-image",
    { image: image },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response;
}

export async function fetchAvatarImage() {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:5000/get-avatar-image", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
}

export async function fetchUserData() {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:5000/get-user-data", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response;
}
