const { redirect } = require("next/dist/next-server/server/api-utils");

module.exports = {
    env:{
        MONGO_URI:process.env.MONGO_URI,
        TOKEN_KEY:process.env.TOKEN_KEY
    },

}