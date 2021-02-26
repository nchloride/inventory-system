export default new class TokenHandler{
    

    public setCookie(token:string){
        document.cookie = `token = ${token}`;
    }
    get getCookie(){
        return document.cookie.split(";")
                .map(cookies => cookies.split("="))
                .reduce((accumulator, [key, val])=>
                    ({...accumulator,[key.trim()]:decodeURIComponent(val)})
                )
    }
    public deleteToken(){
        document.cookie = `token = `;
    }
}