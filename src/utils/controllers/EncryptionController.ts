const bcrypt = require("bcryptjs");
export default new class EncryptionHandler{
    private SALT = 10;
    public async getEncryptedPassword(password){
            return await bcrypt.hash(password,this.SALT);   
    }
    public async isEncrypted(password,hashedPassword){
        return await bcrypt.compare(password,hashedPassword);
    }
}