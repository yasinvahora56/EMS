import AttandanceSchema from "../model/AttandanceModel.js"

const getAttendanceRecords = async (req, res) => {
    try {
        const employeeId = req.employeeId;
        
        // Find all records for this employee, sorted by most recent first
        const records = await AttandanceSchema.find({ employeeId }).sort({ createdAt: -1 });
        
        res.status(200).json({
            message: "Attendance records retrieved",
            count: records.length,
            records: records
        });
    } catch (error) {
        console.error("Error retrieving attendance records:", error);
        res.status(500).json({ 
            message: "Error retrieving records", 
            error: error.message 
        });
    }
};

const checkin = async (req, res) => {
    try {
        const employeeId = req.employeeId;

        // Check for any existing active check-in
        const existingActiveCheckin = await AttandanceSchema.findOne({ 
            employeeId, 
            status: { $in: ["Checked In", "On Break"] } 
        });

        if (existingActiveCheckin) {
            return res.status(400).json({ 
                message: "You are already checked in", 
                currentStatus: existingActiveCheckin.status 
            });
        }

        // Create new check-in record
        const attendance = new AttandanceSchema({ 
            employeeId, 
            status: "Checked In",
            checkin: new Date()
        });

        await attendance.save();

        res.status(200).json({ 
            message: "Checked in successfully", 
            attendance 
        });

    } catch (error) {
        console.error("Error during check-in:", error);
        res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
};
const checkout = async (req, res) => {
    try {
        console.log("Employee ID from request:", req.employeeId); // 🔍 Debugging

        const employeeId = req.employeeId;

        if (!employeeId) {
            return res.status(400).json({ message: "Employee ID is missing" });
        }

        // Find the most recent check-in
        const attendance = await AttandanceSchema.findOne({
            employeeId,
            status: "Checked In"
        }).sort({ checkin: -1 });

        if (!attendance) {
            return res.status(400).json({ message: "No active check-in record found" });
        }

        const currentTime = new Date();
        const checkinTime = new Date(attendance.checkin);
        const totalHours = Math.abs(currentTime - checkinTime) / 36e5;

        attendance.checkout = currentTime;
        attendance.totalHours = parseFloat(totalHours.toFixed(2));
        attendance.status = "Checked Out";

        await attendance.save();

        res.status(200).json({
            message: "Checked out successfully",
            attendance
        });

    } catch (error) {
        console.error("Error during check-out:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};



export {
    getAttendanceRecords,
    checkin,
    checkout
}
