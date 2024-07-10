import express from "express";
import AddStudentModel from '../models/Students.js'
import multer from 'multer';
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/profiles');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post("/addstudent", upload.single('profileImage'), async (req, res) => {
  console.log("addstudent API called");

  if (req.file) {
    req.body.profileImage = `/uploads/profiles/${req.file.filename}`;
  }
   console.log("after adding profile image req body is",req.body);
  try {
    console.log("addstudent API called");

    const {
      rollNumber,
      studentName,
      fatherName,
      motherName,
      classname,
      phoneNumber,
      dateOfBirth,
      section,
      gender,
      address,
      profileImage,
    } = req.body;
    
    console.log(req.body);

    const newStudent = new AddStudentModel({
      rollNumber,
      studentName,
      fatherName,
      motherName,
      phoneNumber,
      dateOfBirth,
      classname,
      section,
      gender,
      address,
      profileImage,
    });
    console.log(newStudent);
   const savedStudent =  await newStudent.save();
   console.log("saved student is",savedStudent);
    return res.json({
      status: true,
      message: "Registerd Successfully",
      newStudent : savedStudent
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

router.put("/editstudent/:id", upload.single('profileImage'), async (req, res) => {
  console.log(" edit student  API is called");
  // console.log("params", req.params);
  const { id } = req.params;
  console.log("id is",id);
  // const data = req.body;
  // console.log(data)
    
  const data = {
    ...req.body,
    profileImage:  req.file ?  `/uploads/profiles/${req.file.filename}` :req.body.profileImage
  };
  console.log("data after adding image");
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