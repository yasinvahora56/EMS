import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import mongoose from "mongoose";



const app = express()
app.use(bodyParser.json())
app.use(cors())
dotenv.config()
const URL = process.env.MONGOCONNECTION

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


