import bcrypt from "bcrypt"
import EmployeeModel from "../model/employeeModel.js"
import EmployeeDetailModel from "../model/employeeDetailModel.js";
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found", success: false });
    }

    // Compare passwords
    const matchPassword = await bcrypt.compare(password, user.password);
    console.log("Password match:",user.password,  password);

    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    // Generate token
    const jwtToken = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      id: user._id,
      role: user.role,
    });

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message
    });
  }
};


export const signup = async (req, res) => {
  try {
    const { name, department, email, gender, course, joindate } = req.body;
    const password = "123456";
    
    // Check if user already exists
    const user = await EmployeeModel.findOne({ email });
    if (user) {
      return res.status(409).json({ 
        message: "User Already Exists", 
        success: false 
      });
    }

    // Create base employee with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const employeeModel = new EmployeeModel({
      name,
      department,
      email,
      gender,
      joindate,
      password: hashedPassword,
      role: 'employee' // Default role
    });
    
    const savedEmployee = await employeeModel.save();
    console.log("Created employee:", savedEmployee._id);

    // Create EmployeeDetail document with initial data
    const employeeDetail = new EmployeeDetailModel({
      employee: savedEmployee._id,
      name,
      email,
      gender,
      department,
      joinDate: joindate,
      degreeName: course || "",
      role: 'employee'
    });

    await employeeDetail.save();
    console.log("Created employee detail for:", savedEmployee._id);

    return res.status(201).json({
      message: "Signup Successfully", 
      success: true,
      employeeId: savedEmployee._id
    });
    
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Internal Server Error", 
      success: false, 
      error: error.message
    });
  }
};