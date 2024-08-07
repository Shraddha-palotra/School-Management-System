// src/api.js

import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const fetchUserData = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch user data", error);
    throw error;
  }
};

export const updateUserProfile = async (id, formData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/auth/updateprofile/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update profile", error);
    throw error;
  }
};
