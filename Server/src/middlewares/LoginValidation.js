import joi from "joi"

const LoginValidation = (req, res, next) => {
    const schema = joi.object({
        email:joi.string().email().required(),
        password: joi.string().min(5).max(20).required()
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