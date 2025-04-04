import UserModel from "../model/UserModel.js";

export const updateProfile = async (req, res) => {
    try {
        const employeeId = req.employeeId
        const employeeData = await UserModel.findById(employeeId);
        if (!employeeData) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const {name, email, joindate, gender, designation} = req.body
        const updateEmployeeData = await UserModel.findByIdAndUpdate(employeeId, {
            name,
            email,
            joindate,
            gender,
            designation
        }, { new: true });
        if (!updateEmployeeData) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Profile updated successfully", employeeData: updateEmployeeData });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
        
    }
}