import database from "../../../utils/config/database";
import nc from "next-connect";
import {NextApiRequest,NextApiResponse} from "next";


const employees = database.get("employees");
export default nc<NextApiRequest,NextApiResponse>()
    .delete(async(req,res)=>{
        const {id} = req.query;
        try{
            await employees.findOneAndDelete({_id:id});
            res.json({
                message:"Employee successfully removed!"
            })
        }
        catch(error){
            res.status(400).json(error);
        }
        
    })