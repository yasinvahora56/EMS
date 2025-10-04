import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import authRouter from "./Routes/authRoute.js";
import attendanceRouter from "./Routes/attendanceRoute.js"
import taskRouter from "./Routes/taskRoutes.js"
import profileRouter from "./Routes/profileRoute.js"
import leaveRouter from "./Routes/leaveRoutes.js"
import employeeRouter from "./Routes/employeeRoute.js"
import payrollRouter from "./Routes/payrollRoute.js"

const app = express()
app.use(bodyParser.json())
dotenv.config()
app.use(cors())

const URL = process.env.MONGOCONNECTION
app.use('/auth', authRouter) 
app.use('/attendance', attendanceRouter)
app.use('/task', taskRouter)
app.use('/profile', profileRouter)
app.use('/leave', leaveRouter)
app.use('/employee', employeeRouter)
app.use('/payroll', payrollRouter)



mongoose.connect(URL)
    .then(() => {
        console.log("Mongodb Connected")
    }).catch((err) => {
        console.log(`Something Went Wrong With DB ${err}` )
    })
                                          

const PORT = process.env.PORT || 4000


app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})


