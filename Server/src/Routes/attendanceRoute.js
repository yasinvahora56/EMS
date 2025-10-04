import express from 'express';
import { 
    checkin, 
    checkout, 
    endBreak, 
    getAttendanceRecords, 
    startBreak
} from '../controller/attendanceController.js';
import {fetchEmployeeId} from '../middlewares/Validation/FetchEmployeeId.js';

const routes = express.Router();

routes.get('/records', fetchEmployeeId, getAttendanceRecords);
routes.post("/checkin", fetchEmployeeId, checkin);
routes.post('/checkout', fetchEmployeeId, checkout);
routes.post("/startBreak", fetchEmployeeId, startBreak)
routes.post("/endBreak", fetchEmployeeId, endBreak)

export default routes;

