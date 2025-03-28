import express from 'express';
import { 
    checkin, 
    checkout, 
    getAttendanceRecords 
} from '../controllers/attendanceController.js';
import CheckoutValidation from '../middlewares/CheckoutValidation.js';
import FetchEmployeeId from '../middlewares/FetchEmployeeId.js';

const router = express.Router();

// Debug route to get all attendance records
router.get('/records', CheckoutValidation, getAttendanceRecords);

// Existing check-in and check-out routes
router.post("/checkin", FetchEmployeeId, checkin);
router.post('/checkout', CheckoutValidation, checkout);

export default router;