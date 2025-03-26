import bcrypt from "bcrypt"
import UserModel from "../model/UserModel.js" 

const signup = async (req, res) => {
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

export default signup