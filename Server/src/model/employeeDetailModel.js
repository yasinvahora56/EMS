import mongoose from "mongoose";
const schema = mongoose.Schema;

const employeeDetailSchema = new schema({
  employee: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
    unique: true // Ensure one detail per employee
  },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  gender: { type: String },
  address: { type: String }, // Added from your form
  city: { type: String }, // Added from your form
  pincode: { type: String },
  department: { type: String },
  designation: { type: String },
  manager: { type: String },
  joinDate: { type: Date },
  degreeName: { type: String },
  graduationYear: { type: String },
  collageName: { type: String },
  skills: { type: String },
  role: { type: String }, // Added role field
  password: { type: String }
}, { timestamps: true });

// Add index for faster queries
employeeDetailSchema.index({ employee: 1 });

const EmployeeDetailModel = mongoose.model('employeeDetail', employeeDetailSchema);
export default EmployeeDetailModel;