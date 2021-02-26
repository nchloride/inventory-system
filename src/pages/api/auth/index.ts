import database from "../../../utils/database";
import {NextApiRequest,NextApiResponse} from "next";
import nc from "next-connect";
import jwt from 'jsonwebtoken'

const employeeDatabase = database.get("employees");
export default nc<NextApiRequest,NextApiResponse>()
    .post(async (req,res)=>{
        req.body = JSON.parse(req.body)
        const {name} = req.body;
        console.log(name);
        
        employeeDatabase.findOne({name})
            .then(employee=>{
                if(employee){
                    console.log(process.env.MONGO_URI);
                    console.log(process.env.TOKEN_KEY);
                    res.json(
                        {
                            token:jwt.sign(employee,process.env.TOKEN_KEY),
                        }
                    )
                    
                }
                else{
                    res.json(
                        {
                            token:false
                        }
                    )
                }
            })
            .catch(err=>{
                res.json(err)
            })
    })