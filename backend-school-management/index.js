import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {UserRouter} from './routes/user.js';
import { AddStudentRouter } from './routes/AddStudents.js'
import { AddStaffRouter } from './routes/AddStaff.js'
import { AddFeeRouter } from './routes/AddFee.js';
import bodyParser from 'body-parser';

dotenv.config()


const app = express()
app.use(express.json())
app.use(cors({
     origin: ["http://localhost:3000"],
     credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)
app.use('/student', AddStudentRouter)
app.use('/staff', AddStaffRouter)
app.use('/fee', AddFeeRouter)

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect("mongodb://127.0.0.1:27017/school" ,{
}).then( () => {
     console.log("Connected to MongooDb");
}).catch((err) => {
     console.log("error connected to mongoDb",err)
})

app.listen(process.env.PORT, () => {
     console.log('Backend is running on port', process.env.PORT);
   });