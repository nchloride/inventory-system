import database from "../../../utils/config/database";
import {NextApiRequest,NextApiResponse} from "next";
import nc from "next-connect";
import jwt from 'jsonwebtoken'

const employeeDatabase = database.get("employees");
export default nc<NextApiRequest,NextApiResponse>()
    .post(async (req,res)=>{
        req.body = JSON.parse(req.body)
        const {name} = req.body;
        employeeDatabase.findOne({name})
            .then(employee=>{
                if(employee){
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