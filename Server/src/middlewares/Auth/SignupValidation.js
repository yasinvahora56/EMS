import joi from "joi"

const SignupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        // allow both capitalized and lowercase values to avoid frontend mismatch
        department: joi.string().valid(
          "Designing","designing",
          "Development","development",
          "Social Media","social media"
        ).required(),
        email: joi.string().email().required(),
        phone: joi.string().pattern(/^[0-9]{10}$/).optional(), // make phone optional or change to required if frontend sends it
        // allow both cases for gender
        gender: joi.string().valid("Male","Female","Other","male","female","other").required(),
        course: joi.string().min(3).max(50).optional(),
        joindate: joi.date().optional(),
        password: joi.string().min(6).max(50).optional()
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