import mongoose from "mongoose";
const schema = mongoose.Schema

const payrollSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    Allowance: {
        type: String,
        required: true,
    },
    Deduction: {
        type: String,
        required: true,
    },
    total: {
        type: String,
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
});

const payrollModel = mongoose.model("Payroll", payrollSchema);
export default payrollModel