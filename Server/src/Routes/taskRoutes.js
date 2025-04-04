import { createTask, deleteTask, getAllTasksAdmin, getAllTasksEmployee} from '../controller/taskController.js';
import {fetchEmployeeId} from '../middlewares/Validation/FetchEmployeeId.js';

import express from "express"

const router = express.Router()

router.post('/create', fetchEmployeeId, createTask)
router.get('/adminTask', fetchEmployeeId, getAllTasksAdmin)
router.get('/EmployeeTask', fetchEmployeeId, getAllTasksEmployee)
router.delete('/delete/:taskId', fetchEmployeeId, deleteTask)

export default router