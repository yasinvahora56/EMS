import mongoose from "mongoose"
const schema = mongoose.Schema

const UserSchema = new schema({
    name:{
    type: String,
    required: true
    },
    email:{
    type: String,
    required: true
    },
    gender:{
    type: String,
    required: true
    },
    course:{
    type: String,
    required: true
    },
    joindate:{
    type: String,
    required: true
    },
    employeeId:{
    type: String,
    required: true
    },
    designation:{
    type: String,
    required: true
    },
    password:{
    type: String,
    required: true
    },
})

const UserModel = mongoose.model('users', UserSchema)
export default UserModel