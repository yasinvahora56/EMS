import joi from "joi"

const LoginValidation = (req, res, next) => {
    const schema = joi.object({
        employeeId:joi.string().min(2).max(10).required(),
        password: joi.string().min(6).max(10).required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        console.error("login Error", error)
        return res.status(400)
            .json({
                message: "Bad Request",
                error
            })
    }
    next()
}

export default LoginValidation