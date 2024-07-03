import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
     name: {type: String, require: true, unique: true},
     phoneNumber: {type: String, require: true},
     email: {type: String, require: true, unique: true},
     password: {type: String, require: true},
})


const AnotherModel = mongoose.model( 'Users',UserSchema)

export default AnotherModel; 