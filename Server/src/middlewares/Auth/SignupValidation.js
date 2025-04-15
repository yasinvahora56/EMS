import joi from "joi"

const SignupValidation = (req, res, next) => {
    const schema = joi.object({
        employeeName: joi.string().min(3).max(30).required(),
        department: joi.string().valid("Designing", "Development", "Social Media").required(),
        email: joi.string().email().required(),
        phone: joi.string().pattern(/^[0-9]{10}$/).required(),
        password: joi.string().min(6).max(10)
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