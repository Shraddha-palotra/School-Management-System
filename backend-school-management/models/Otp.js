import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
     email: {type: String, required: true},
     otp : {type:String, required : true},
     expiresAt: {type:String, required:true},
})


const Otp = mongoose.model( 'Otp',OtpSchema)

export default Otp; 