import express from "express";
import { fetchEmployeeId } from "../middlewares/Validation/FetchEmployeeId.js";
import { getMyProfile, upsertProfile } from "../controller/profileController.js";

const router = express.Router();
router.get("/myProfile", fetchEmployeeId, getMyProfile);
router.patch("/update", fetchEmployeeId, upsertProfile);

export default router;