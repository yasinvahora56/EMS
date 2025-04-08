import UserModel from "../model/UserModel.js"

// get all employee

export const getAllEmployee = async (req, res) => {
    try{
        const employeeData = await UserModel.find().select("-password");
        if(!employeeData){
            return res.status(404).json({message: "No Employee Found"});
        }
        return res.status(200).json({message: "Employee Fetched Successfully", employeeData});
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal Server Error"});
    }

}

// get one employee

export const getEmployee = async(req, res) => {
    try{
        const  employeeId   = req.params.id ;
        console.log(employeeId)
        if(!employeeId){
        return res.status(404).json({message: "Id Require"});
        }
        const fetchEmployeeData = await UserModel.find({ _id: employeeId }).select("-password -__v")
        console.log(fetchEmployeeData)
        if(!fetchEmployeeData){
            return res.status(404).json({message: "No Employee Found"});
        }
        return res.status(200)
            .json({message: "One Employee Fetched Successfully", fetchEmployeeData})
    }catch{
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params
        if(!id){
            return res.status(404).json({message: "Id Require"});
        }
        await UserModel.findByIdAndDelete(id)
        return res.status(200)
            .json({message: "Employee Deleted Successfully"})
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error During Delete Employee"});
    }
}
