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
}