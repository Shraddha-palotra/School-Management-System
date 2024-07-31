import  Axios  from "axios";

const BASE_URL = "http://localhost:8080/staff";

export const addStaff = async (formData) => {
  try {
    const response = await Axios.post(`${BASE_URL}/addstaff`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const editStaff = (id, formData) => {
     return Axios.put(`${BASE_URL}/editstaffs/${id}`, formData, {
       headers: {
         'Content-Type': 'multipart/form-data',
       },
     });
   };

export const deleteStaffById = async (id) => {
     try {
       const response = await Axios.delete(`${BASE_URL}/deletestaffs/${id}`);
       return response.data;
     } catch (error) {
       throw new Error('Failed to delete staff');
     }
   };

   export const getAllStaff = () => {
     return Axios.get(`${BASE_URL}/showstaffs`);
   };