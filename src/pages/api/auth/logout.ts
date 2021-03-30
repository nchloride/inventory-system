import nc from "next-connect";
import {NextApiRequest,NextApiResponse} from "next";
import cookie from "cookie";


export default nc<NextApiRequest,NextApiResponse>()
    .get((req,res)=>{
        res.setHeader("Set-Cookie",cookie.serialize("token","",{
            maxAge:-1,
            path:'/'
        }));
        res.writeHead(302,{Location: '/'});
        res.end();
    })