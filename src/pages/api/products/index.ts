import nextConnect from "next-connect";
import apiMiddleware from "../../../lib/authorizationMiddleware";
import database from "../../../utils/config/database";
import {NextApiRequest,NextApiResponse} from "next"
import productSchema from "../../../utils/schema/productSchema";

const products = database.get("products");
export default nextConnect<NextApiRequest,NextApiResponse>()
    .use(apiMiddleware)
    .get(async (req,res)=>{
        try {
            const allProducts = await products.find({});
            res.json(allProducts);
        } catch (error) {
            res.json(error)
        }
    })
    .post(async (req,res)=>{
        try {
            const validatedProduct = await productSchema.validateAsync(req.body);
            products.insert(validatedProduct)
                .then(result=>{res.json({
                    result,
                    success:true
                })}) 
        } catch (error) {
            res.json({
                success:false
            })
        }
    })