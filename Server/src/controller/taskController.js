import taskModel from "../model/taskModel.js";

export const createTask = async(req, res) => {
    try {
        const role = req.role
        if(role !== "admin"){
            return res.status(403).json({ message: "Only Admin can create task" });
        }
        const { description, priority } = req.body;
        if(!description){
            return res.status(400).json({ message: "Description is required" });
        }
    const task = new taskModel({
        description,
        priority: priority || "Medium",
    })

    await task.save()
    res.status(201).json({ message: "Task created successfully", task });
        
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


export const deleteTask = async(req, res) => {
    try{
        const { taskId } = req.params;
        if(!taskId){
            return res.status(400).json({ message: "Task ID is required" });
        }
        await taskModel.findByIdAndDelete(taskId)
        res.status(200).json({message: "Task Deleted SuccessFully"})
    }catch(error){
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const getAllTasksAdmin = async(req, res) => {
    try{
        const tasks = await taskModel.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Tasks retrieved successfully", tasks });
    }catch{
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
export const getAllTasksEmployee = async(req, res) => {
    try{
        const tasks = await taskModel.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Tasks retrieved successfully", tasks });
    }catch{
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}