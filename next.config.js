
module.exports = {
    env:{
        MONGO_URI:process.env.MONGO_URI,
        TOKEN_KEY:process.env.TOKEN_KEY
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