import AttandanceSchema from "../model/AttandanceModel.js"

export const getAttendanceRecords = async (req, res) => {
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

export const checkin = async (req, res) => {
    try {
        const employeeId = req.employeeId;

        // Ahiya check kareche ke user pehle thi che ke nai
        const existingActiveCheckin = await AttandanceSchema.findOne({ 
            employeeId, 
            status: { $in: ["Checked In", "On Break"] } 
        });

        // agar user pehle thi check in che to error aavse
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
export const checkout = async (req, res) => {
    try {
        console.log("Employee ID from request:", req.employeeId); // 🔍 Debugging

        const employeeId = req.employeeId;

        if (!employeeId) {
            return res.status(400).json({ message: "Employee ID is missing" });
        }

        // Find the most recent check-in
       const attendance = await AttandanceSchema.findOne({
        employeeId,
        status: {$in: ["Checked In", "On Break"]},
        checkout:  null
       })

        if (!attendance) {
            return res.status(400).json({ message: "No active check-in record found" });
        }

        const currentTime = new Date();
        const checkinTime = new Date(attendance.checkin);
        const totalHours = (currentTime-checkinTime) / (1000 * 60 * 60)

        let totalBreakTime = 0
        if(attendance.breaks && attendance.breaks.length > 0){
            attendance.breaks.forEach(breakPeriod => {
                const breakStart = new Date(breakPeriod.startTime)
                const breakEnd = breakPeriod.endTime ? new Date(breakPeriod.endTime) : currentTime
                totalBreakTime += (breakEnd - breakStart) /(100 * 60 *60)
            }

            )
        }

        if (attendance.status === "On Break") {
            const currentBreak = attendance.breaks[attendance.breaks.length - 1];
            if(!currentBreak.endTime){
                const breakEnd = currentTime;
                const breakStart = new Date(currentBreak.startTime);
                totalBreakTime = (breakEnd - breakStart) /(1000 * 60 * 60)

                currentBreak.endTime = breakEnd
                currentBreak.duration = parseFloat

            }
        }

        const effectiveHours = totalHours - totalBreakTime;


        attendance.checkout = currentTime;
        attendance.totalHours = parseFloat(totalHours.toFixed(2));
        attendance.effectiveHours = parseFloat(effectiveHours.toFixed(2))
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


export const startBreak = async (req, res) => {
    try {
      const employeeId = req.employeeId;
      
      // Find the active check-in record
      const attendance = await AttandanceSchema.findOne({
        employeeId,
        status: "Checked In",
        checkout: null
      });
      
      if (!attendance) {
        return res.status(400).json({ 
          message: "You must be checked in to start a break" 
        });
      }
      
      // Create a new break entry
      const newBreak = {
        startTime: new Date()
      };
      
      // Add the break to the breaks array
      attendance.breaks = attendance.breaks || [];
      attendance.breaks.push(newBreak);
      
      // Update status to On Break
      attendance.status = "On Break";
      
      await attendance.save();
      
      res.status(200).json({
        message: "Break started successfully",
        attendance
      });
      
    } catch (error) {
      console.error("Error starting break:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  };
  
  export  const endBreak = async (req, res) => {
    try {
      const employeeId = req.employeeId;
      
      // Find the active break
      const attendance = await AttandanceSchema.findOne({
        employeeId,
        status: "On Break"
      });
      
      if (!attendance) {
        return res.status(400).json({ 
          message: "No active break found" 
        });
      }
      
      // Get the last break (current break)
      const currentBreak = attendance.breaks[attendance.breaks.length - 1];
      
      if (!currentBreak || currentBreak.endTime) {
        return res.status(400).json({ 
          message: "No active break found or break already ended" 
        });
      }
      
      // Set the end time and calculate duration
      const endTime = new Date();
      const startTime = new Date(currentBreak.startTime);
      const breakDuration = (endTime - startTime) / (1000 * 60 ); // Convert to Minutes
      
      // Update the break record
      currentBreak.endTime = endTime;
      currentBreak.duration = parseFloat(breakDuration.toFixed(2));
      
      // Update status back to Checked In
      attendance.status = "Checked In";
      
      await attendance.save();
      
      res.status(200).json({
        message: "Break ended successfully",
        attendance
      });
      
    } catch (error) {
      console.error("Error ending break:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  };


