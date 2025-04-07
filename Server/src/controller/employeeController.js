import UserModel from "../model/UserModel"

// get all employee

export const getAllEmployee = () => {
    try{
        const employeeData = await UserModel.find();

    }

}

// get one employee

export const getEmployee = () => {
    const { employeeId } = req.params ;

}
