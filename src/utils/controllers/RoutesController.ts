const jwt = require("jsonwebtoken");
import Cookie from "cookie"
export default  class RoutesHandler{
    private router;
    constructor(router){
        this.router = router
    }
    public async redirectRoute(token){
        try {
            const decodedToken = await jwt.verify(token,process.env.TOKEN_KEY);
            this.router.push(`/${decodedToken.role}`); 
            document.cookie = `token=${token}`;
            
        } catch (error) {
            this.router.push("/");
        }
    }
    public async refreshRoute(){
        this.router.push(this.router.asPath);
    }

}