import bcrypt from "bcrypt"
import EmployeeModel from "../model/employeeModel.js"
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
        const {employeeName, department, email,phone} = req.body
        const password  = "123456"
        const user = await EmployeeModel.findOne({ email })
        if (user) {
            return res.status(409)
                .json({message: "User Alredy Exist", success: false })
        }
        const employeeModel = new EmployeeModel({
          employeeName,
            department,
            email, 
            phone,
            password
        })
        employeeModel.password = await bcrypt.hash(password, 10)
        
        await employeeModel.save()
        return res.status(201)
            .json({
                message: "Signup Successfully", success:true
            })
    } catch (error) {
        return res.status(500)
            .json({
                message: "Internal Server Error", success:false, error: error.message
            })
    }
}