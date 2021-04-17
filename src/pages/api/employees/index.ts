import {NextApiRequest,NextApiResponse} from "next";
import nc from "next-connect"
import {postSchema,updateSchema} from "../../../utils/validations/employeeSchema";
import database from "../../../utils/config/database";
import EncryptionController from "../../../utils/controllers/EncryptionController";
import bcrypt from "bcryptjs"
// export default async function (req:NextApiRequest,res:NextApiResponse){
//     res.json({message:"Working!"})

// }

const employeeDb = database.get("employees")
export default nc<NextApiRequest,NextApiResponse>()
    .use((req,res,next)=>{
        next();
    })
    .post(async(req,res)=>{
        try{
            console.log(req.body);
            
            const validatedEmployee = await postSchema.validateAsync(req.body);
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
    .patch(async(req,res)=>{
        const {_id,name,address,username,branch,rate,newPassword:password} = req.body;
        const hashedPassword = await EncryptionController.getEncryptedPassword(password);
        try {
            const validatedUser = await updateSchema
                                            .validateAsync(
                                                {
                                                    name,
                                                    address,
                                                    branch,
                                                    rate,
                                                    ...(password && {password:hashedPassword}),
                                                    username,
                                                }
                                            );
            employeeDb.findOneAndUpdate({_id},{$set:validatedUser})
                .then((updatedDoc)=>{
                    res.json({
                        message:"Employee Updated!",
                        updatedDoc
                    })
                }
            )
        
        }
        catch(error) {
            res.json(error)
        }
    })