const jwt = require("jsonwebtoken");

export default  class RoutesHandler{
    private router;
    constructor(router){
        this.router = router
    }
    public async redirectRoute(token){
        try {
            const decodedToken = await jwt.verify(token,process.env.TOKEN_KEY);
            document.cookie = `token=${token}`
            this.router.push(`/${decodedToken.role}`); 
        } catch (error) {
            this.router.push("/");
        }
    }
    public async refreshRoute(){
        this.router.push(this.router.asPath);
    }

}