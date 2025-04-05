import bcrypt from "bcrypt"
import UserModel from "../model/UserModel.js"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    try {
         const { email, password } = req.body        

         const user = await UserModel.findOne({ email })
         if(!user) {
            res.status(403)
                .json({message: "User Not Found", success: false })
         }
        
         const isEqueal = await bcrypt.compare(password, user.password)
         if(!isEqueal) {
            res.status(403)
                .json({ message: "Invalid Credentials",success: false})
         }
         const jwtToken = jwt.sign(
            {_id : user.id, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
         )
         res.status(200)
            .json({ 
                msg: "Login Success",
                success:true,
                jwtToken,
                id: user._id,
               role: user.role,
            })

    } catch (error) {
        console.error("login error", error)
        res.status(500)
        .json({
            message: "Internal Server Error", 
            success:false,
            error: error.message
        })
    }
} 

export const signup = async (req, res) => {
    try {
        const {name, email, gender, course, joindate, designation, password} = req.body
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(409)
                .json({message: "User Alredy Exist", success: false })
        }
        const userModel = new UserModel({
            name, 
            email, 
            gender, 
            course, 
            joindate,
            designation, 
            password
        })
        userModel.password = await bcrypt.hash(password, 10)
        
        res.status(201)
            .json({
                message: "Signup Successfully", success:true
            })
        await userModel.save()
    } catch (error) {
        res.status(500)
            .json({
                message: "Internal Server Error", success:false
            })
    }
}