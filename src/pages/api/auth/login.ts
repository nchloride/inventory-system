import nc from "next-connect";
import {NextApiRequest,NextApiResponse} from "next";
import cookie from "cookie";


export default nc<NextApiRequest,NextApiResponse>()
    .post((req,res)=>{
        const token = req.body.token;
        res.setHeader("Set-Cookie",cookie.serialize("token",token,{
            maxAge:60*60*24,
            httpOnly:true,
            sameSite:`strict`,
            secure:true,
            path:'/'
        }));
        res.statusCode = 200;
        res.json({loggedIn:true})
    })