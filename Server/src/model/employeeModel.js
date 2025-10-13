import mongoose from "mongoose";
const schema = mongoose.Schema;

const employeeSchema = new schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  gender: { 
    type: String 
  },
  designation: { 
    type: String 
  },
  department: { 
    type: String 
  },
  joindate: { 
    type: Date 
  },
  role: { 
    type: String, 
    enum: ['employee', 'admin', 'manager'],
    default: 'employee' 
  }
}, { timestamps: true });

const EmployeeModel = mongoose.model('employee', employeeSchema);
export default EmployeeModel;