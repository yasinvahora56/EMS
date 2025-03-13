import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import router from "./Routes/Authrouter.js";

const app = express()
app.use(bodyParser.json())
dotenv.config()
app.use(cors())

const URL = process.env.MONGOCONNECTION
app.use('/auth', router) 

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


