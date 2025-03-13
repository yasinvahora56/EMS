import joi from "joi"

const LoginValidation = (req, res, next) => {
    const schema = joi.object({
        employeeId:joi.string().min(2).max(10).required(),
        Password: joi.string().min(6).max(10).required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400)
            .json({message: "Bad Request"})
    }
    next()
}

export default LoginValidation