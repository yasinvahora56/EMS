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
    gender:{
    type: String,
    required: true
    },
    pincode:{
    type: String,
    required: true
    },
    department:{
    type: String,
    required: true
    },
    designation:{
    type: String,
    required: true
    },
    manager:{
    type: String,
    required: true
    },
    joinDate:{
    type: Date,
    required: true
    },
    joinDate:{
    type: Date,
    required: true
    },
    degreeName: { 
    type: String,
    required: true
    },
    graduationYear: { 
    type: String,
    required: true
    },
    collageName: { 
    type: String,
    required: true
    },
    skills: { 
    type: String,
    required: true
    },
    password:{
    type: String,
    required: true
    },
})

const EmployeeDetailModel = mongoose.model('employeeDetail', employeeSchema)
export default EmployeeDetailModel