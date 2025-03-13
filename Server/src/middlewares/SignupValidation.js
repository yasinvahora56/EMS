import joi from "joi"

const SignupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(2).max(20).required(),
        email: joi.string().email().required(),
        gender: joi.string().min(4).max(20).required(),
        course: joi.string().min(2).max(10).required(),
        joindate: joi.string().required(),
        employeeId: joi.string().min(2).max(10).required(),
        designation: joi.string().min(3).max(15).required(),
        password: joi.string().min(6).max(10).required()
    })
    
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400)
            .json({
                message: "Bad Request", 
                details: error.details[0].message,
                path: error.details[0].path
            })
    }
    next()
}

export default SignupValidation