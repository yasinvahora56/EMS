import { updateProfile, getMyProfile } from "../controller/profileController.js";
import { fetchEmployeeId } from "../middlewares/Validation/FetchEmployeeId.js";

import express from "express";

const router = express.Router();

router.patch("/update", fetchEmployeeId, updateProfile);
router.get("/myProfile", fetchEmployeeId, getMyProfile);

export default router;