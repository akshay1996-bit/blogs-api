const { PrismaClient } = require("@prisma/client");

const routes = async (fastify, options) => {
  const prisma = new PrismaClient();
  fastify.post("/blogs/post", async (req, reply) => {
    const { title, content, authorId } = req.body;
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    reply.send(blog);
  });

  fastify.get("/blogs", async (req, reply) => {
    const blogs = await prisma.blog.findMany();
    reply.send(blogs);
    // fastify.mysql.query(
    //     'SELECT * FROM blogs',
    //     function onResult(err,result){
    //         reply.send(result || err)
    //     }
    // )
  });

  fastify.patch("/blogs/update/:id", async (req, reply) => {
    const { id } = req.params;
    const { title, content, authorId } = req.body;
    try {
      const blog = await prisma.blog.update({
        where: { id: Number(id) },
        data: {
          title,
          content,
          authorId,
        },
      });
      console.log("BODY", blog);
      reply.send(blog);
    } catch (err) {
      if (err.code === "P2025") {
        reply.status(400).send({ message: "Invalid Id" });
      }
    }
  });

  fastify.get("/blog/:id", async (req, reply) => {
    const { id } = req.params;
    try {
      const blog = await prisma.blog.findFirst({
        where: { id: Number(id) },
      });
      reply.send(blog);
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.delete('/blog/delete/:id',async(req,reply)=>{
    const {id} = req.params
    try{
      const blog = await prisma.blog.delete({
        where: {id: Number(id)}
      })
      reply.send(blog)
    }catch(err){
      if(err.code === 'P2025'){
        reply.send({message: 'Invalid Id'})
      }
      reply.send(err)
    }
  })
};

module.exports = routes;
