import AttandanceSchema from "../model/AttandanceModel.js";
import leaveModel from "../model/leaveModel.js";
import UserModel from "../model/UserModel.js"

// get all employee

export const getAllEmployee = async (req, res) => {
    try{
        const employeeData = await UserModel.find().select("-password");
        if(!employeeData){
            return res.status(404).json({message: "No Employee Found"});
        }
        return res.status(200).json({message: "Employee Fetched Successfully", employeeData});
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal Server Error"});
    }

}

// get one employee

export const getEmployee = async(req, res) => {
    try{
        const  employeeId   = req.params.id ;
        // console.log(employeeId)
        if(!employeeId){
        return res.status(404).json({message: "Id Require"});
        }
        const fetchEmployeeData = await UserModel.find({ _id: employeeId }).select("-password -__v")
        // console.log(fetchEmployeeData)
        if(!fetchEmployeeData){
            return res.status(404).json({message: "No Employee Found"});
        }
        return res.status(200)
            .json({message: "One Employee Fetched Successfully", fetchEmployeeData})
    }catch{
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params
        if(!id){
            return res.status(404).json({message: "Id Require"});
        }
        await UserModel.findByIdAndDelete(id)
        return res.status(200)
            .json({message: "Employee Deleted Successfully"})
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error During Delete Employee"});
    }
}

export const getEmployeeAttendance = async (req, res) => {
    try {
        // Properly parse the date from the query parameter
        const dateParam = req.query.date;
        let date;
        
        if (dateParam) {
            // Create a date object from the ISO string
            date = new Date(dateParam);
        } else {
            date = new Date();
        }
        
        console.log("Selected Date:", date);
        
        // Ensure date is valid
        if (isNaN(date.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }
        
        date.setHours(0, 0, 0, 0); // start of the day (00:00:00)
        
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1); // start of next day (exclusive)

        const employeeData = await AttandanceSchema.find({
            checkin: {
                $gte: date,
                $lt: tomorrow
            }
        });

        if (!employeeData || employeeData.length === 0) {
            return res.status(404).json({ message: "No Employee Found for this date" });
        }

        return res.status(200).json({ message: "Employee Attendance Fetched Successfully", employeeData });
    } catch (error) {
        console.error("Error in getEmployeeAttendance:", error);
        return res.status(500).json({ message: "Internal Error", error: error.message });
    }
};