import axios from "axios";

const baseUrl = "http://localhost:6173";

const getImageData = async (file) => {
  const formData = new FormData();
  formData.append("photo", file);

  const response = await axios.post(baseUrl + "/image/getUrl", formData, {
    headers: { "Content-Type": "Multipart/form-data" },
    withCredentials: false,
  });
  if (response.data.success) {
    return response.data;
  }
};

const postBlog = async ({ title, content, isPastEvent }) => {
  try {
    let info = await JSON.parse(localStorage.getItem("info"));
    const response = await axios.post(
      baseUrl + "/blogs/new",
      { title, content, isPastEvent },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${info.token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
const getAllUsers = async () => {
  try {
    let info = await JSON.parse(localStorage.getItem("info"));
    const response = await axios.get(baseUrl + "/users/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${info.token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
const updateBlog = async ({ blogID, title, content, category }) => {
  let info = await JSON.parse(localStorage.getItem("info"));
  console.log(baseUrl + "/blogs/" + blogID);
  console.log(blogID);
  const response = await axios.patch(
    baseUrl + "/blogs/" + blogID,
    { title, content, category },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${info.token}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};
const deleteBlog = async ({ blogID }) => {
  let info = await JSON.parse(localStorage.getItem("info"));
  console.log(baseUrl + "/blogs/" + blogID);
  const response = await axios.delete(baseUrl + "/blogs/" + blogID, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${info.token}`,
    },
  });
  console.log(response.data);
  return response.data;
};
const modifyUser = async ({ userID, isAdmin }) => {
  let info = await JSON.parse(localStorage.getItem("info"));
  const response = await axios.patch(
    baseUrl + "/users/" + userID,
    { isAdmin, isMember },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${info.token}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};
const getAllBlogs = async () => {
  const response = await axios.get(baseUrl + "/blogs/all/");
  console.log(response.data);
  return response.data;
};

const fetchBlog = async (id) => {
  console.log(id);
  try {
    const response = await axios.get(baseUrl + "/blogs/" + id);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error, "here");
  }
};

async function fetchData() {
  let info = JSON.parse(localStorage.getItem("info"));
  console.log("Here", info);
  if (info && info.token) {
    let { token, userID } = info;
    let userInfo = await axios.get("http://localhost:6173/users/" + userID, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(userInfo.data);
    if (userInfo) return userInfo.data;
    else return {};
  }
}

export {
  postBlog,
  getImageData,
  getAllBlogs,
  fetchData,
  fetchBlog,
  updateBlog,
  getAllUsers,
  modifyUser,
  deleteBlog,
};
