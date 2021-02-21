import database from "../../../utils/database";
import {NextApiRequest,NextApiResponse} from "next";
import nc from "next-connect";


const employeeDatabase = database.get("employees");
export default nc<NextApiRequest,NextApiResponse>()
    .post(async (req,res)=>{
        req.body = JSON.parse(req.body)
        const {name} = req.body;
        console.log(name);
        
        employeeDatabase.findOne({name})
            .then(employee=>{
                if(employee){
                    res.json({
                        authenticated:true,
                        role:"employee",
                        employee
                    });
                }
                else{
                    res.json({
                        authenticated:false,
                        role:"not found",
                    });
                }
            })
            .catch(err=>{
                res.json(err)
            })
    })