import express, { response } from "express";
import AddStudentModel from "../models/Students.js";

const router = express.Router();

router.post("/addstudent", async (req, res) => {
  console.log("addstudent API called");
  try {
    console.log("addstudent API called");

    const {
      studentName,
      fatherName,
      motherName,
      className,
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
      !className ||
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
      className,
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
    console.error("Error in signup API:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
});

// show student in front end
router.get("/showstudents", async (req, res) => {
  try {
    console.log("showstudent API called");
    const AllStudents = await AddStudentModel.find();
    return res.json({ status: true, AllStudents });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
});
export { router as AddStudentRouter };

//  edit srtudent API'S

router.put("/editstudent/:id", async (req, res) => {
  console.log("editstudent API called");
  try {
    const id = req.params.id;
    const data = req.body;

    const {
      studentName,
      fatherName,
      motherName,
      phoneNumber,
      dateOfBirth,
      className,
      section,
      gender,
      address
    } = data;

    // Validate the input

    if (
      !studentName ||
      !fatherName ||
      !motherName ||
      !phoneNumber ||
      !dateOfBirth ||
      !className ||
      !section ||
      !gender ||
      !address
    ) {
      return res.status(400).json({ msg: "Please enter all the fields" });
    }

    // Find the student by ID and update the details
    const updatedStudent = await AddStudentModel.findByIdAndUpdate(
      { _id: id },

      { $set: data },

      { new: true }
      // Return the updated document
    );
    console.log(updatedStudent);
    return res.status(200).json({ msg: "data is updated", updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
});
