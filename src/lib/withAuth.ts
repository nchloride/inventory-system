import cookie from "cookie";
const jwt = require("jsonwebtoken");


export const withAuth = (getServerSideProps) => ({req,res}) =>{
    
    
    const {token} = cookie.parse(req.headers.cookie);
    return jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=>{
        if(decoded){
            console.log(getServerSideProps);
            
            return getServerSideProps;
        }
        else{
            return{
                redirect:{
                    destination:"/",
                    permanent:false
                }
            }
        }
    })
}