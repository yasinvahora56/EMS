import { createLeaveRequest, deleteLeaveRequest, getAllLeaveRequests, getLeaveRequest, updateLeaveRequest } from "../controller/leaveController.js";
import { fetchEmployeeId } from "../middlewares/Validation/fetchEmployeeId.js";
import express from "express";

const router = express.Router()

router.post("/create", fetchEmployeeId, createLeaveRequest)
router.get("/get", fetchEmployeeId, getAllLeaveRequests)
router.get("/getOne", fetchEmployeeId, getLeaveRequest)
router.patch("/update/:id", fetchEmployeeId, updateLeaveRequest)
router.delete("/delete/:id", fetchEmployeeId, deleteLeaveRequest)

export default router