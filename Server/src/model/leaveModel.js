import mongoose from "mongoose";
const schema = mongoose.Schema

const leaveSchema = new schema({
    employeeId: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        require: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
        enum:["Rejected", "Approved", "Pending"]
    },
},
{timestamps: true}
)

const leaveModel = mongoose.model("leave", leaveSchema)
export default leaveModel