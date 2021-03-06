const jwt = require("jsonwebtoken");
import {NextApiRequest,NextApiResponse} from "next"
export const apiMiddleware = async (req:NextApiRequest,res:NextApiResponse,next) =>{
    const authenticationToken = req.headers.authorization.split(" ")[1];
    jwt.verify(authenticationToken,process.env.TOKEN_KEY,(err,decoded)=>
        { 
            if(err){
                res.statusCode = 403;
                res.json({
                    message:"TOKEN NOT FOUND"
                })
            }
            if(decoded.role ==="admin"){
                next();
            }
        }
    );
}
export default apiMiddleware;