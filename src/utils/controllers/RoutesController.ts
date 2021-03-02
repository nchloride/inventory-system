const jwt = require("jsonwebtoken");

export default  class RoutesHandler{
    private router;
    constructor(router){
        this.router = router
    }
    public async redirectRoute(token){
        const decodedToken = await jwt.verify(token,process.env.TOKEN_KEY);
        if(decodedToken.role ==="admin"){
            this.router.push("/admin")
        }
        else{
            this.router.push("/employee");
        }
    }
    public async refreshRoute(){
        this.router.push(this.router.asPath);
    }
}