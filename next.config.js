
module.exports = {
    env:{
        MONGO_URI:process.env.MONGO_URI,
        TOKEN_KEY:process.env.TOKEN_KEY,
        DOMAIN: process.env.DOMAIN
    },
    async redirects(){
        return[
            {
                source:"/admin",
                destination:"/admin/dashboard",
                permanent:false
            }
        ]
    }
}