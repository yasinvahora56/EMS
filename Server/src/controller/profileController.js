import EmployeeDetailModel from "../model/employeeDetailModel.js";

export const updateProfile = async (req, res) => {
    try {
        const employeeId = req.employeeId
        console.log("Employee ID:", employeeId);
        const employeeData = await EmployeeDetailModel.find({ _id: employeeId }).select("-password -__v");
        console.log("Employee Data:", employeeData);
        if (!employeeData) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const { employeeName, email, phone, gender, pincode, department, designation, manager, joinDate, degreeName, graduationYear, collageName, skills} = req.body
        const updateEmployeeData = await EmployeeDetailModel.findByIdAndUpdate(employeeId, {
            employeeName,
            email,
            phone,
            gender,
            pincode,
            department,
            designation,
            manager,
            joinDate,
            degreeName,
            graduationYear,
            collageName,
            skills,         
        }, { new: true });
        if (!updateEmployeeData) {
            return res.status(404).json({ message: "Employee not found" });
        }
        return res.status(200).json({ message: "Profile updated successfully"});

    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// get user profile
export const getMyProfile = async(req, res) => {
    try{
        const employeeId = req.employeeId
        const employeeData = await EmployeeDetailModel.findById(employeeId).select("-password -__v");
        if (!employeeData) {
            return res.status(404).json({ message: "Employee not found" });
        }
        return res.status(200).json({ message: "Profile retrieved successfully", employeeData });

    }catch(error){        
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }

}