import express from "express";
import AddStudentModel from '../models/Students.js'

const router = express.Router();

router.post("/addstudent", async (req, res) => {
  console.log("addstudent API called");
  try {
    console.log("addstudent API called");

    const {
      studentName,
      fatherName,
      motherName,
      classname,
      phoneNumber,
      dateOfBirth,
      section,
      gender,
      address,
    } = req.body;

    console.log(req.body);

    if (
      !studentName ||
      !fatherName ||
      !motherName ||
      !phoneNumber ||
      !dateOfBirth ||
      !classname ||
      !section ||
      !gender ||
      !address
    ) {
      return res.status(400).json({ msg: "Please enter all the fields" });
    }

    const newStudent = new AddStudentModel({
      studentName,
      fatherName,
      motherName,
      phoneNumber,
      dateOfBirth,
      classname,
      section,
      gender,
      address,
    });
    console.log(newStudent);
    await newStudent.save();
    return res.json({
      status: true,
      message: "Registerd Successfully",
      newStudent,
    });
  } catch (error) {
    console.error("Error in addstudent API:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
});

// show student in front end
router.get("/showstudents", async (req, res) => {
  try {
    console.log("show student API called");
    const AllStudents = await AddStudentModel.find();
    return res.json({ status: true, AllStudents });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error",AllStudents });
  }
});


//  edit student API'S

router.put("/editstudent/:id", async (req, res) => {
  console.log(" edit student  API is called");
  // console.log("params", req.params);
  const { id } = req.params;
  console.log("id is",id);
  const data = req.body;
  // console.log("id is", id);
  console.log(data)
 
  try {
    const updatedStudent = await AddStudentModel.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      {new: true}
    );
    console.log(updatedStudent)
    return res.json({
      status: true,
      message: "update data successfully",
      updatedStudent,
    });
  } catch (error) {
    console.log(error);
  }
});


// delete student API'S

router.delete("/deletestudents/:id", async (req,res) => {
  console.log("Delete/student  API is called ");
   const id = req.params.id;
  console.log("id is",id);
  try{
    console.log(`Deleting student with ID: ${id}`);
      const deleteStudent = await AddStudentModel.findByIdAndDelete({_id:id});
     return res.status(200).json({status:true,msg: "Student deleted successfully", deleteStudent});
  } catch (error) {
    console.log(`Error deleting student with ID: ${id}`, error);
    return res.status(500).json({msg: "Internal server Error"});

  }
})

export { router as AddStudentRouter };