import mongoose from "mongoose";

const AddStaffSchema = new mongoose.Schema({
     staffName : {type:String , required : true},
     staffPosition : {type:String , required : true},
     phoneNumber : {type:String , required : true , minLength : 10},
     joinDate : {type:String , required : true},
     salary : {type:String , required : true},
     gender : {type:String , required : true},
     description : {type:String , required : true},
     profileImage : {type : String , required: true},
})

const AddStaffModel = mongoose.model("addstaff",AddStaffSchema)

export default AddStaffModel;