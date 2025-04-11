import {getAllEmployee, getEmployee, deleteEmployee, getEmployeeAttendance} from "../controller/employeeController.js"
import express from "express";

const router = express.Router()

router.get("/", getAllEmployee)
router.get("/attendance", getEmployeeAttendance)
router.get("/:id", getEmployee)
router.delete("/:id", deleteEmployee)

export default router