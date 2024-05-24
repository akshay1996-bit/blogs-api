const Fastify = require('fastify')
const routes = require('./blogs/apis')
const prismaPlugin = require('./prismaPlugin')
const userRoutes = require('./users/api')
const fastify = Fastify({
    logger: true
})
fastify.register(prismaPlugin)
fastify.register(routes)
fastify.register(userRoutes)


fastify.get('/',(request,reply)=>{
    reply.send({message: 'Welcome'})
})

fastify.listen({port: 5000},(err,address)=>{
    if(err){
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})