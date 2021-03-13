import jwt from "jsonwebtoken";


export default new class TokenHandler{
    get getCookie(){
        return Object.assign({},...document.cookie.split(";")
                .map(cookies => cookies.split("="))
                .map(([key,val]) =>{
                    return {[key]:val}
                })).token
    }
    public deleteToken(){
        document.cookie = `token = `;
    }

    public async getCredentials(){
        return  jwt.verify(this.getCookie,process.env.TOKEN_KEY);
    }
}