const bcrypt = require("bcryptjs");
export default new class EncryptionHandler{
    private SALT = 10;
    public async getEncryptedPassword(password:string){
            return await bcrypt.hash(password,this.SALT);   
    }
    public async isEncrypted(password:string,hashedPassword:string):Promise<string>{
        return await bcrypt.compare(password,hashedPassword);
    }
}