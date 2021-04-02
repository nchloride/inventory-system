import jwt from "jsonwebtoken";
import cookie from "cookie"
export default new class TokenHandler{
    get getCookie(){
        // return Object.assign({},...document.cookie.split(";")
        //         .map(cookies => cookies.split("="))
        //         .map(([key,val]) =>{
        //             return {[key]:val}
        //         })).token
        const {token} = cookie.parse(document.cookie);
        return token;
    }
    public async deleteToken(){
        document.cookie = "token =;Expires= Thu, 01 Jan 1970 00:00:01 GMT;";
        await fetch("/api/auth/logout");
    }

    public async getCredentials(){
        return  jwt.verify(this.getCookie,process.env.TOKEN_KEY);
    }
}