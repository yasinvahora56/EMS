import express from 'express';
import { createPayroll, getPayroll, getAllPayroll, updateStatus } from '../controller/payrollController.js';
const router = express.Router();

router.post('/create', createPayroll);
router.get('/', getAllPayroll)
router.get('/:id', getPayroll);
router.patch('/update/:id', updateStatus);

export default router;