import leaveModel from "../model/leaveModel.js"

export const createLeaveRequest = async (req, res) => {
    try {

        const employeeId = req.employeeId
        console.log(employeeId)
        // const employeeData = await leaveRequestModel.findById(employeeId)
        // if(!employeeData){
        //     res.status(402)
        //         .json({message: "Employee Not Found"})
        // }
        const { name, startDate, endDate, description} = req.body
        console.log(name, startDate, endDate, description)
        if( !name || !startDate || !endDate || !description){
            res.status(400)
                .json({ message: "All Feilds are Require", error: error.message})
        }
        const leave = new leaveModel({
            employeeId,
            name,
            startDate,
            endDate,
            description
        })
        console.log("hii")
        await leave.save()

        res.status(201).json({ message: "leave created successfully"});
    } catch (error) {
        res.status(400)
            .json({message: "Error During Create Leave Request", error: error.message})
    }
}
export const getAllLeaveRequests = async (req, res) => {
    try {
        const leaves = await leaveModel.find().sort({ createdAt: -1 })
        
        res.status(200)
            .json({ messsage: "Leave Successfully Fetched", leaves})
    } catch (error) {
        res.status(400)
            .json({message: "Error During Get Leave Request", error: error.message})
    }
}
export const getLeaveRequest = async (req, res) => {
    try {
        const id  = req.employeeId
        console.log("Looking for id", id)
        if(!id){
            res.status(401)
                .json({message: "id is Required"})
        }
        const leaves = await leaveModel.find({employeeId: id})
        console.log(leaves)
        res.status(200)
            .json({ messsage: "One Leave Successfully Fetched", leaves})
    } catch (error) {
        res.status(400)
            .json({message: "Error During Get Leave Request", error: error.message})
    }
}

export const updateLeaveRequest = async (req, res) => {

    try {
        const { status } = req.body
        const leaveId = req.params.id

        if(!leaveId){
            res.status(401)
                .json({message: "Leave id is Required"})
        }
        if(!status){
            res.status(401)
                .json({message: "status is Required"})
        }
        const leave = await leaveModel.findById(leaveId)
        if(!leave){
            return res.status(404)
                .json({meassage: "Leave Not Fornd"})
        }
        leave.status = status
        await leave.save()
        res.status(200)
            .json({message: "Leave Updated Successfully", leave})
        // if(leave.status === "approved"){
        //     res.status(200)
        //         .json({message: "Leave Approved Successfully"})
        // }else if(leave.status === "rejected"){
        //     res.status(200)
        //         .json({message: "Leave Rejected Successfully"})
        // }

    } catch (error) {
        res.status(500).json({ message:"Error During Update Leave", error: error.message }); 
    }

}

export const deleteLeaveRequest = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        if(!id){
            res.status(401)
                .json({message: "Leave id is Required"})
        }
        await leaveModel.findByIdAndDelete(id)
        res.status(200)
            .json({message: "Leave Deleted Successfully"})
    } catch (error) {
        res.status(400)
            .json({message: "Error During Delete Leave Request", error: error.message})
    }
}