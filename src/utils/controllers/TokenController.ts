import jwt from "jsonwebtoken";

export default new class TokenHandler{
    get getCookie(){
        return Object.assign({},...document.cookie.split(";")
                .map(cookies => cookies.split("="))
                .map(([key,val]) =>{
                    return {[key]:val}
                })).token
    }
    public async deleteToken(){
            // document.cookie = "token =;Expires= Thu, 01 Jan 1999 00:00:01 GMT;";
            // console.log(document.cookie);
            
        // document.cookie = "token =";
        await fetch("/api/auth/logout");
        // return null;
    }

    public async getCredentials(){
        return  jwt.verify(this.getCookie,process.env.TOKEN_KEY);
    }
}