import Joi from "joi";


export default Joi.object({
    name:Joi.string().required(),
    // dateHired:Joi.date().required(),
    address:Joi.string().required(),
    branch:Joi.string().required(),
    rate:Joi.number().required(),
    password:Joi.string().required(),
    username:Joi.string().required(),
    role:Joi.string().required(),
})