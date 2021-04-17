import Joi from "joi";


const postSchema = Joi.object({
    name:Joi.string().required(),
    // dateHired:Joi.date().required(),
    address:Joi.string().required(),
    branch:Joi.string().required(),
    rate:Joi.number().required(),
    password:Joi.string().required,
    username:Joi.string().required(),
    role:Joi.string().required(),
})
const updateSchema = Joi.object({
    name:Joi.string().required(),
    address:Joi.string().required(),
    branch:Joi.string().required(),
    rate:Joi.number().required(),
    password:Joi.string(),
    username:Joi.string().required(),
})
export {
    postSchema,
    updateSchema
}