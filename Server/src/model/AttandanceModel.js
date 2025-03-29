import mongoose from "mongoose";
const schema = mongoose.Schema;

// Define a sub-schema for breaks
const BreakSchema = new schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    default: null
  },
  duration: {
    type: Number,
    default: 0
  }
});

const AttendanceSchema = new schema({
  employeeId: {
    type: String,
    required: true
  },
  checkin: {
    type: Date,
    default: Date.now
  },
  checkout: {
    type: Date,
    default: null
  },
  breaks: [BreakSchema],  // Array to store multiple breaks
  totalHours: {
    type: Number,
    default: 0
  },
  effectiveHours: {  // Working hours excluding breaks
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["Checked In", "On Break", "Checked Out"],
    required: true
  }
}, { timestamps: true });

const AttandanceSchema = mongoose.model('attendance', AttendanceSchema);
export default AttandanceSchema;