import nc from "next-connect";
import {NextApiRequest,NextApiResponse} from "next";
import cookie from "cookie";


export default nc<NextApiRequest,NextApiResponse>()
    .get((req,res)=>{
        res.setHeader("Set-Cookie",cookie.serialize("token","",{
            maxAge:-1,
            expires:new Date("Thu, 01 Jan 1970 00:00:00 GMT"),
            path:'/',
        }));
        res.writeHead(302,{location: '/'});
        res.end();
    })