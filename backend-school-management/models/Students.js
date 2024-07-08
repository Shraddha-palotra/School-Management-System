import mongoose from "mongoose";

const AddStudentSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true},
    phoneNumber: { type: String, required: true, minLength:10, maxLength: 10 },
    dateOfBirth: { type: String, required: true },
    classname: { type: String, required: true },
    section: { type: String, required: true },
    gender: { type: String, required: true },
    address: {type: String, required: true}
})

const AddStudentModel = mongoose.model("addstudent", AddStudentSchema)

export default AddStudentModel;