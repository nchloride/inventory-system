const jwt = require("jsonwebtoken");

export default  class RoutesHandler{
    private router;
    constructor(router){
        this.router = router
    }
    public redirectRoute(token){
        const decodedToken = jwt.verify(token,process.env.TOKEN_KEY);
        if(decodedToken.role ==="admin"){
            this.router.push("/admin")
        }
        else{
            this.router.push("/employee");
        }
    }
}