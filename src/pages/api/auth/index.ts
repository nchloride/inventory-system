import database from "../../../utils/config/database";
import {NextApiRequest,NextApiResponse} from "next";
import nc from "next-connect";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import cookie from "cookie";

import {session} from "next-session"
const employeeDatabase = database.get("employees");
export default nc<NextApiRequest,NextApiResponse>()
    .use(session())
    .post(async (req,res)=>{   
        const {username,password} = req.body.data;
        employeeDatabase.findOne({username})
            .then(employee=>{
                bcrypt.compare(password,employee.password,(err,emp)=>{
                    if(emp){
                        const authenticationToken = jwt.sign(employee,process.env.TOKEN_KEY);
                        res.setHeader("Set-Cookie",cookie.serialize("token",authenticationToken,{
                            httpOnly:true,
                            sameSite:true,
                            maxAge:60*60*24
                        }));
                        res.json(
                            {
                                token:authenticationToken
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
            })
            .catch(err=>{
                res.json(err)
            })
    })