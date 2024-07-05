import express from "express";
import AddStaffModel from "../models/Staff.js";

const router = express.Router();

//  addstaff API's 

router.post("/addstaff", async (req, res) => {
  console.log("Add Staff API'S called ");

  try {
    const {
      staffName,
      staffPosition,
      phoneNumber,
      joinDate,
      salary,
      gender,
      description,
    } = req.body;
    console.log(req.body);

    if (
      (!staffName,
      !staffPosition,
      !phoneNumber,
      !joinDate,
      !salary,
      !gender,
      !description)
    ) {
      return res.status(200).json({ msg: "Please enter all fields" });
    }

    const newStaff = new AddStaffModel({
      staffName,
      staffPosition,
      phoneNumber,
      joinDate,
      salary,
      gender,
      description,
    });
    console.log(newStaff);
    await newStaff.save();
    return res.json({ status: true, msg: "Registered successfully", newStaff });
  } catch (error) {
    console.log("Error in addstaff API's", error);
    return res.status(500).json({ mag: "Internal server errror" });
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
            .json({ status: false, message: "Internal Server Error",AllStaff});
          
     }

})

// edit staff API's 

router.put("/editstaffs/:id", async (req, res) => {
  console.log("Edit staff API's called")
  console.log(req.params)
  const { id } = req.params;
  console.log("id is",id);
  const data = req.body;
  console.log("id is ",id)
  console.log("data from backend",data)

  try {
     const updateStaff = await AddStaffModel.findByIdAndUpdate(
      {_id: id},
      {$set: data},
      {new: true}
     );
     console.log("update staff",updateStaff)
     return res.json({status: true, msg: "update data successfully ", updateStaff})
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
     return res.status(200).json({status:true, msg:"Staff deleted successfully ", deleteStaff});
  } catch (error) {
    console.log(`Error deleting staff with ID: ${id}`, error);
    return res.status(500).json({msg: "Internal server Error"});
  }
}) 

export { router as AddStaffRouter };
