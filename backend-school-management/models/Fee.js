import mongoose from "mongoose";

const AddFeeSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    classname: { type: String, required: true },
    quaterlyFee: {type:String, required: true},
    feeStatus : {type:String, required: true},
    section : {type:String, required: true},
    description: {type:String, required: true},
    profileImage : {type : String , required: true},
})

const AddFeeModel = mongoose.model("addfee", AddFeeSchema)

export default AddFeeModel;