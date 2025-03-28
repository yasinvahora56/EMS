import login from "../Controller/Logincontroller.js"
import signup from "../Controller/signupController.js"
import  SignupValidation  from "../middlewares/Auth/SignupValidation.js"
import  LoginValidation  from "../middlewares/Auth/LoginValidation.js"
import { 
    checkin, 
    checkout, 
    getAttendanceRecords 
} from '../controller/AttandanceController.js';
import FetchEmployeeId from '../middlewares/Validation/FetchEmployeeId.js';
import express from "express"

const router = express.Router()

router.post('/login',LoginValidation, login)
router.post('/signup', SignupValidation, signup)
router.get('/records', FetchEmployeeId, getAttendanceRecords);
router.post("/checkin", FetchEmployeeId, checkin);
router.post('/checkout', FetchEmployeeId, checkout);

export default router