import { login, signup } from "../controller/authController.js"
import  SignupValidation  from "../middlewares/Auth/SignupValidation.js"
import  LoginValidation  from "../middlewares/Auth/LoginValidation.js"
import express from "express"

const router = express.Router()

router.post('/login',LoginValidation, login)
router.post('/signup', SignupValidation, signup)


export default router