import {NextApiRequest,NextApiResponse} from "next";
import nc from "next-connect"
import employeeAuth from "../../../utils/validations/employeeAuth";
import database from "../../../utils/config/database";
import EncryptionController from "../../../utils/controllers/EncryptionController";
const bcrypt = require('bcryptjs');
// export default async function (req:NextApiRequest,res:NextApiResponse){
//     res.json({message:"Working!"})

// }

const employeeDb = database.get("employees")
export default nc<NextApiRequest,NextApiResponse>()
    .post(async(req,res)=>{
        try{
            console.log(req.body);
            
            req.body = JSON.parse(req.body);
            const validatedEmployee = await employeeAuth.validateAsync(req.body);
            const {password,username} = req.body;
            const hashedPassword = await EncryptionController.getEncryptedPassword(password);
            employeeDb.findOne({username}).then((employee)=>{
                if(employee){
                    res.json({
                        message:"Username already exist!",
                        added:false
                    })
                }
                else{
                    employeeDb.insert({...validatedEmployee,password:hashedPassword});
                    res.json({
                        message:"Employee Added!",
                        added:true
                    })
                }
            })
        }
        catch(e){
            res.json(e);
        }
    })
    .get( async(req,res)=>{
        try{
            const employees = await employeeDb.find({});
            res.json(employees);
        }
        catch(e){
            res.json(e)
        }
    })