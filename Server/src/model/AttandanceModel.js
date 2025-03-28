import mongoose from "mongoose";
const schema = mongoose.Schema;

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
    totalHours: { 
        type: Number
    },
    status: {
        type: String,
        enum: ["Checked In", "On Break", "Checked Out"],
        required: true
    }
}, { timestamps: true });

const AttandanceSchema = mongoose.model('attendance', AttendanceSchema);
// const AttendanceModel = mongoose.model('attendance', AttendanceSchema)
export default AttandanceSchema;