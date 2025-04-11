import mongoose from "mongoose";
const { Schema } = mongoose;

const payrollSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
        ref: "User",
    },
    salary: {
        type: Number,
        required: true,
    },
    allowance: {
        type: Number,
        default: 0,
    },
    deduction: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "unpaid",
        enum: ["paid", "unpaid"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true 
});

const payrollModel = mongoose.model("Payroll", payrollSchema);
export default payrollModel;
