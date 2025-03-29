import express from 'express';
import { 
    checkin, 
    checkout, 
    endBreak, 
    getAttendanceRecords, 
    startBreak
} from '../controller/attendanceController.js';
import FetchEmployeeId from '../middlewares/Validation/FetchEmployeeId.js';

const routes = express.Router();

routes.get('/records', FetchEmployeeId, getAttendanceRecords);
routes.post("/checkin", FetchEmployeeId, checkin);
routes.post('/checkout', FetchEmployeeId, checkout);
routes.post("/startBreak", FetchEmployeeId, startBreak)
routes.post("/endBreak", FetchEmployeeId, endBreak)

export default routes;

