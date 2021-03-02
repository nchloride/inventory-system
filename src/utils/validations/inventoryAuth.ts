import Joi from "joi";

module.exports = Joi.object({
    branch:Joi.string().required(),
    stocks:Joi.number().required(),
    name:Joi.string().required(),
    price:Joi.number().required(),
    date:Joi.date().required()
})