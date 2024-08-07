import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

export const changeUserPassword = async (userId, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/changepassword/${userId}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
