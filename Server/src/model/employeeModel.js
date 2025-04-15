import mongoose from "mongoose"
const schema = mongoose.Schema

const employeeSchema = new schema({
    employeeName:{
        type: String,
        required: true
    },
    email:{
    type: String,
    required: true
    },
    phone:{
    type: String,
    required: true
    },
    department:{
    type: String,
    required: true
    },

    role: { 
        type: String,
        default: "employee",
        enum:["admin", "employee"]
    },
    password:{
    type: String,
    required: true
    },
})

const EmployeeModel = mongoose.model('users', employeeSchema)
export default EmployeeModel