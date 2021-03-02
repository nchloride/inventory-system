import database from "../../../utils/config/database";
import {NextApiRequest,NextApiResponse} from "next";
import nc from "next-connect";
import jwt from 'jsonwebtoken'

const employeeDatabase = database.get("employees");
export default nc<NextApiRequest,NextApiResponse>()
    .post(async (req,res)=>{   
        const {name} = req.body;
        employeeDatabase.findOne({name})
            .then(employee=>{
                if(employee){
                    const authenticationToken = jwt.sign(employee,process.env.TOKEN_KEY);
                    res.setHeader("Set-Cookie",`token=${authenticationToken}`);
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