import Joi, { string } from "joi";

export default  Joi.object({
    name:Joi.string().required(),
    price:Joi.number().required(),
    stocks:Joi.number().required(),
    date:Joi.date().required(),
})