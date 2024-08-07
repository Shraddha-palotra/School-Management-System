import Axios from "axios";
export const BASE_URL = "http://localhost:8080/fee/";

export const addFee = async (feeData) => {
  try {
    const response = await Axios.post(`${BASE_URL}addfees`, feeData);
    console.log("Add Fee Response:", response.data.message);
    return response.data;
  } catch (error) {
    console.error("Error adding fee:", error);
    throw error;
  }
};

export const deleteFee = async (id) => {
  try {
    const response = await Axios.delete(`${BASE_URL}deletefees/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editFee = async (id, feeData) => {
  try {
    const response = await Axios.put(`${BASE_URL}editfees/${id}`, feeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllFees = async () => {
     try {
       const response = await Axios.get(`${BASE_URL}/showfees`);
       return response.data.AllFee;
     } catch (error) {
       throw error;
     }
   };