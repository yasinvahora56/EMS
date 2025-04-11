import express from 'express';
import { createPayroll, getPayroll, getAllPayroll } from '../controller/payrollController.js';
const router = express.Router();



router.post('/create', createPayroll);
router.get('/', getAllPayroll)
router.get('/:id', getPayroll);


export default router;