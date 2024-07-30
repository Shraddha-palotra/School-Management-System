import express from "express";
import AddStaffModel from "../models/Staff.js";
import multer from 'multer';
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
import validationErrors from "../ERRORS/Validations.js";

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

//  add staff
router.post("/addstaff", upload.single('profileImage'),async (req, res) => {
  console.log("Add Staff API'S called ");

  if (req.file) {
    req.body.profileImage = `/uploads/profiles/${req.file.filename}`;
  }


  try {
    const {
      staffName,
      staffPosition,
      email,
      phoneNumber,
      joinDate,
      salary,
      gender,
      description,
      profileImage,
    } = req.body;
    console.log(req.body);

    const isExistingEmail = await AddStaffModel.findOne({email});
    if (isExistingEmail) {
      return res.status(400).json({status : false, field: "email", message: validationErrors.STAFF_EMAIL_ALREADY_EXIST})
    }

    const newStaff = new AddStaffModel({
      staffName,
      staffPosition,
      email,
      phoneNumber,
      joinDate,
      salary,
      gender,
      description,
      profileImage,
    });
    console.log(newStaff);
    await newStaff.save();
    return res.json({ status: true, message: validationErrors.REGISTERED_SUCCESSFULLY, newStaff });
  } catch (error) {
    console.log("Error in addstaff API's", error);
    return res.status(500).json({ message: validationErrors.INTERNAL_SERVER_ERROR});
  }
});

//  show stafff API's in frontend 

router.get("/showstaffs", async (req,res) => {
     try {
         console.log("Show  staff API called");
         const AllStaff = await AddStaffModel.find();
         return res.json({status: true ,AllStaff})
     } catch (error) {
          console.error("Error fetching students:", error);
          return res
            .status(500)
            .json({ status: false, message: validationErrors.INTERNAL_SERVER_ERROR,AllStaff});
          
     }

})

// edit staff API's 

router.put("/editstaffs/:id", upload.single('profileImage'),async (req, res) => {
  console.log("Edit staff API's called")
  // console.log(req.params)

  const { id } = req.params;
  console.log("id is",id);

  // const data = req.body;
  // console.log("data from backend",data)

  const isExistingStaffEmail = await AddStaffModel.find({
    email: req.body.email,
    _id:{$ne: id},
  })
  if (isExistingStaffEmail.length > 0) {
    return res.status(400).json({status: false, field: "email", message:validationErrors.STAFF_ALLREADY_REGISTER});
  } 
 
  const data = {
    ...req.body,
    profileImage: req.file ? `/uploads/profiles/${req.file.filename}`: req.body.profileImage
  };

  try {
     const updateStaff = await AddStaffModel.findByIdAndUpdate(
      {_id: id},
      {$set: data},
      {new: true}
     );
     console.log("update staff",updateStaff)
     return res.json({status: true, message: validationErrors.DATA_UPDATE_SUCCESSFULLY, updateStaff})
   } catch (error) {
     console.log(error)
  };
});

//  delete staff API's 
router.delete("/deletestaffs/:id", async (req,res) => {
  console.log("Delete staff API called");

  const id = req.params.id;
  console.log("id is",id);
  try {
     console.log(`Deleting staff with ID: ${id}`);
     const deleteStaff = await AddStaffModel.findByIdAndDelete({_id:id});
     return res.status(200).json({status:true, message:validationErrors.STAFF_DELETED, deleteStaff});
  } catch (error) {
    console.log(`Error deleting staff with ID: ${id}`, error);
    return res.status(500).json({message: validationErrors.INTERNAL_SERVER_ERROR});
  }
}) 

export { router as AddStaffRouter };
