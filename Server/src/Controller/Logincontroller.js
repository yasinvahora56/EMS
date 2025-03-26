import jwt from "jsonwebtoken"
import UserModel from "../model/UserModel.js"
import bcrypt from "bcrypt"

const login = async (req, res) => {
    try {
         const { email, password } = req.body
         const errmessage="Password or id wrong"
         const user = await UserModel.findOne({ email })
         if(!user) {
            res.status(409)
                .json({msg: errmessage, success: false})
         }
         const isEqueal = await bcrypt.compare(password, user.password)
         if(!isEqueal) {
            res.status(403)
                .json({msg: errmessage, success: false})
         }
         const jwtToken = jwt.sign(
            {email: user.email, _id : user.id, role: user.role, designation: user.designation},
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
         )
         res.status(200)
            .json({ 
                msg: "Login Success",
                success:true,
                jwtToken,
                name: user.name,
                email: user.email,
                role: user.role,
                designation: user.designation
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
export default login