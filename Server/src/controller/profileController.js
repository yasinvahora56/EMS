import EmployeeModel from "../model/employeeModel.js";
import EmployeeDetailModel from "../model/employeeDetailModel.js";
import mongoose from "mongoose";

// Update profile
export const upsertProfile = async (req, res) => {
  try {
    const employeeId = req.employeeId;
    if (!employeeId) return res.status(401).json({ message: "Unauthorized" });

    const employee = await EmployeeModel.findById(employeeId);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const payload = { ...req.body, employee: employeeId };

    const profile = await EmployeeDetailModel.findOneAndUpdate(
      { employee: employeeId },
      payload,
      { upsert: true, new: true, runValidators: true }
    );

    return res.status(200).json({ 
      message: "Profile saved", 
      employeeData: profile 
    });
  } catch (error) {
    console.error("Profile upsert error:", error);
    return res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
};

// Get user profile - FIXED
export const getMyProfile = async (req, res) => {
  try {
    const { employeeId } = req;
    console.log("Employee ID:", employeeId);

    // Validate employeeId
    if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ message: "Invalid Employee ID format" });
    }

    // Find employee detail
    let employeeData = await EmployeeDetailModel.findOne({ employee: employeeId })
      .select("-password -__v");
    
    console.log("Employee Data:", employeeData);

    // If no profile exists, create one from the base employee data
    if (!employeeData) {
      const baseEmployee = await EmployeeModel.findById(employeeId).select("-password -__v");
      
      if (!baseEmployee) {
        return res.status(404).json({ message: "Employee not found in base collection" });
      }

      // Create a new EmployeeDetail document with base data
      employeeData = new EmployeeDetailModel({
        employee: employeeId,
        name: baseEmployee.name,
        email: baseEmployee.email,
        gender: baseEmployee.gender,
        designation: baseEmployee.designation,
        department: baseEmployee.department,
        joinDate: baseEmployee.joindate,
        role: baseEmployee.role
      });
      
      await employeeData.save();
      console.log("Created new employee detail:", employeeData);
    }

    // Get role from base employee model
    const baseEmployee = await EmployeeModel.findById(employeeId).select("role");
    
    // Merge role into response
    const responseData = {
      ...employeeData.toObject(),
      role: baseEmployee?.role || 'employee'
    };

    return res.status(200).json({ 
      message: "Profile retrieved successfully", 
      employeeData: responseData
    });

  } catch (error) {
    console.error("Error in getMyProfile:", error);
    return res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
};