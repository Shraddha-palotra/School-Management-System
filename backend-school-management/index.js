import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {UserRouter} from './routes/user.js';
import { AddStudentRouter } from './routes/AddStudents.js'

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
// app.use('/staff', StaffRouter)

mongoose.connect("mongodb://127.0.0.1:27017/school" ,{
}).then( () => {
     console.log("Connected to MongooDb");
}).catch((err) => {
     console.log("error connected to mongoDb",err)
})

app.listen(process.env.PORT, () => {
     console.log('Backend is running on port', process.env.PORT);
   });