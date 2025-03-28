import express from 'express';
import { 
    checkin, 
    checkout, 
    getAttendanceRecords 
} from '../controller/AttandanceController.js';
import FetchEmployeeId from '../middlewares/Validation/FetchEmployeeId.js';

const routes = express.Router();

routes.get('/records', FetchEmployeeId, getAttendanceRecords);
routes.post("/checkin", FetchEmployeeId, checkin);
routes.post('/checkout', FetchEmployeeId, checkout);

export default routes;