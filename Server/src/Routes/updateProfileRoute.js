import { updateProfile } from "../controller/updateProfileController.js";
import { fetchEmployeeId } from "../middlewares/Validation/FetchEmployeeId.js";

import express from "express";

const router = express.Router();

router.put("/profile", fetchEmployeeId, updateProfile);

export default router;