import login from "../Controller/Logincontroller.js"
import signup from "../Controller/signupController.js"
import  SignupValidation  from "../middlewares/SignupValidation.js"
import  LoginValidation  from "../middlewares/LoginValidation.js"

import express from "express"
const router = express.Router()

router.post('/signup', SignupValidation, signup)
router.post('/login',LoginValidation, login)

export default router