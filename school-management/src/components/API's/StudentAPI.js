import Axios from 'axios';

export const addStudent = (formData) => {
  return Axios.post("http://localhost:8080/student/addstudent", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateStudent = async (id, formData) => {
     try {
       const response = await Axios.put(`http://localhost:8080/student/editstudent/${id}`, formData, {
         headers: {
           "Content-Type": "multipart/form-data",
         },
       });
       return response.data;
     } catch (error) {
       throw error;
     }
   };

   export const deleteStudentAPI = async (id) => {
     try {
       const res = await Axios.delete(`http://localhost:8080/student/deletestudents/${id}`);
       return res.data;
     } catch (error) {
       console.error('Error deleting student:', error);
       throw error;
     }
   };

   export const getStudents = async () => {
     try {
       const response = await Axios.get("http://localhost:8080/student/showstudents");
       return response.data;
     } catch (error) {
       console.error("Error fetching students:", error);
       throw error;
     }
   };