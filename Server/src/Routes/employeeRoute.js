import {getAllEmployee, getEmployee, deleteEmployee} from "../controller/employeeController.js"
import { fetchEmployeeId } from "../middlewares/Validation/fetchEmployeeId.js";
import express from "express";

const router = express.Router()

router.get("/", getAllEmployee)
router.get("/:id", getEmployee)
router.delete("/:id", deleteEmployee)

export default router