import mongoose from 'mongoose';
const schema = mongoose.Schema

const taskSchema = new schema({
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
}, {
    timestamps: true}
)

const taskModel = mongoose.model('Task', taskSchema)
export default taskModel
