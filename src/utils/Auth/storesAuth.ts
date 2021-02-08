import Joi from "joi";

const storeSchema = Joi.object({
    branch:Joi.string().required(),
    location:Joi.string().required(),
    employeeCount:Joi.number().required(),
})

export default storeSchema;