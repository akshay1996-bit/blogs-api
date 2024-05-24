const fastify = require('fastify')()
const db = require('@fastify/mysql')

function dbConnect(){
    fastify.register(db,{
        connectionString: "server=127.0.0.1;uid=root;pwd=password;database=test"
    })
}

module.exports = dbConnect