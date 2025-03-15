import login from "../Controller/Logincontroller.js"
import signup from "../Controller/signupController.js"
import  SignupValidation  from "../middlewares/SignupValidation.js"
import  LoginValidation  from "../middlewares/LoginValidation.js"

import express from "express"
const router = express.Router()

router.post('/login',LoginValidation, login)
router.post('/signup', SignupValidation, signup)

export default router