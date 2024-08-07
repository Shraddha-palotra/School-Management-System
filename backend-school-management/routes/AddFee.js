import express from "express";
import AddFeeModel from "../models/Fee.js";
import AddStudentModel from "../models/Students.js";


const router = express.Router();

//  add fee

router.post("/addfees", async (req, res) => {
  console.log("Fee API's called");
  const {t} = req;

  try {
    const {
      rollNumber,
      studentName,
      fatherName,
      classname,
      quaterlyFee,
      feeStatus,
      section,
      description,
    } = req.body;
    console.log(req.body);

    // if (!rollNumber || !studentName || !fatherName || classname) {
    //   return res.status(400).json({ message: t("Missing required fields") });
    // }

    const user = await AddStudentModel.findOne({
      rollNumber: rollNumber,

    });
    console.log("Student found", user);

    if (!user) {
      // console.log("Student not found with provided details");
      return res.json({ message: t("STUDENT_NOT_FOUND") });
    }

    if(user.studentName.toLowerCase() !== studentName.toLowerCase()) {
      return res.json({status: false, field: "studentName", message: t("STUDENT_NAME_WRONG")})
    }
     
    if(user.fatherName.toLowerCase() !== fatherName.toLowerCase()) {
      return res.json({status: false, field: "fatherName", message: t("FATHER_NAME_WRONG")})
    }

    if(user.classname.toLowerCase() !== classname.toLowerCase()) {
      return res.json({status: false, field: "classname", message: t("CLASSNAME_WRONG")})
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
      profileImage: user.profileImage,
    });
    console.log(newFee);
    const newAllFee = await newFee.save();
    return res
      .status(200)
      .json({
        status: true,
        message: t("REGISTERED_SUCCESSFULLY"),
        newAllFee,
      });
  } catch (error) {
    console.log("Error in Fee API", error);
    return res
      .status(500)
      .json({ status: false, message: t("INTERNAL_SERVER_ERROR") });
  }
});

// show fee API
router.get("/showfees", async (req, res) => {
  const {t} = req;
  try {
    console.log("show fee API called");

    const AllFee = await AddFeeModel.find();
    return res
      .status(200)
      .json({ message: t("ACCESS_DATA_SUCCESSFULLY"), AllFee });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.json({
      status: false,
      message: t("INTERNAL_SERVER_ERROR"),
    });
  }
});

// edit fee API
router.put("/editfees/:id", async (req, res) => {
  console.log("edit API's called");

  console.log("params", req.params);
  const { id } = req.params;
  console.log(id);

  const data = req.body;
  console.log(data);

  const {t} = req;

  try {
    const updateFee = await AddFeeModel.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );
    console.log(updateFee);
    return res.json({
      status: true,
      message: t("DATA_UPDATE_SUCCESSFULLY"),
      updateFee,
    });
  } catch (error) {
    console.log(error);
  }
});

//  delete fee API

router.delete("/deletefees/:id", async (req, res) => {
  console.log("Delete fee API called");
  const id = req.params.id;
  
  console.log("ID is ", id);
  const {t} = req;
  try {
    console.log(`Deleting fee data with ID: ${id}`);
    const deleteFeeData = await AddFeeModel.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({
        status: true,
        message: t("DELETED_SUCCESSFULLY"),
        deleteFeeData,
      });
  } catch (error) {
    console.log(`Error deleting fee data with ID: ${id}`, error);
    return res
      .status(500)
      .json({ message: t("INTERNAL_SERVER_ERROR")});
  }
});

export { router as AddFeeRouter };
