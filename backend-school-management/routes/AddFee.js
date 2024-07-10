import express from "express";
import AddFeeModel from "../models/Fee.js";
import AddStudentModel from '../models/Students.js'

const router = express.Router();

//  add fee

router.post("/addfees", async (req, res) => {
  console.log("Fee API's called");

  try {
    const {rollNumber,studentName, fatherName, classname, quaterlyFee, feeStatus, section, description , profileImage} =
      req.body;
    console.log(req.body);

    const user = await AddStudentModel.findOne({studentName: studentName, fatherName:fatherName, classname:classname});
    console.log("Student found", user);

    if (!user) {
         return res.json({ msg: "Student is not register or status not match"})
    }


    const newFee = new AddFeeModel({
      rollNumber,
      studentName,
      fatherName,
      classname,
      quaterlyFee,
      feeStatus,
      section,
      description,
      profileImage : user.profileImage
    });
    console.log(newFee);
    const newAllFee = await newFee.save();
    return res
      .status(200)
      .json({ status: true, msg: "Register successfully", newAllFee });
  } catch (error) {
     console.log("Error in Fee API",error)
     return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
});

// show fee API 
router.get("/showfees", async (req, res) => {
     try {
       console.log("show fee API called");

       const AllFee = await AddFeeModel.find();
       return res.status(200).json({ msg: "access all fees", AllFee });

     } catch (error) {
       console.error("Error fetching students:", error);
       return res.json({ status: false, message: "Internal Server Error"});
     }
   });

// edit fee API 
router.put("/editfees/:id", async (req,res) => {
  console.log("edit API's called");
   
  console.log("params",req.params);
  const {id} = req.params;
  console.log(id);

  const data = req.body;
  console.log(data);

  try {
     const updateFee = await AddFeeModel.findByIdAndUpdate(
      {_id: id},
      {$set: data},
      {new: true}
     );
     console.log(updateFee);
     return res.json({status: true, msg: "update data successfully", updateFee});

  } catch (error) {
    console.log(error)
  }

})

//  delete fee API

router.delete("/deletefees/:id", async (req,res) => {
  console.log("Delete fee API called");
  const id = req.params.id;

  console.log("ID is ",id);
 try {
  console.log(`Deleting fee data with ID: ${id}`);
  const deleteFeeData =  await AddFeeModel.findByIdAndDelete({_id:id});
  return res.status(200).json({status:true, msg: "Fee data deleted successfully", deleteFeeData});
 } catch (error) {
  console.log(`Error deleting fee data with ID: ${id}`, error);
  return res.status(500).json({msg: "Internal server Error"});
 }
});


export { router as AddFeeRouter };
