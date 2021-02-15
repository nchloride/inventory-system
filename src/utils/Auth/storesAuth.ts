import Joi from "joi";

const storeSchema = Joi.object({
    branch:Joi.string().required(),
    location:Joi.string().required()
})

export default storeSchema;