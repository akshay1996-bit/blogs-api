const { PrismaClient } = require("@prisma/client");

const userRoutes = async (fastify, options) => {
  const prisma = new PrismaClient();
  fastify.post("/user/create", async (req, reply) => {
    const { id, name, email, blogs } = req.body;
    const user = await prisma.user.create({
      data: {
        id,
        name,
        email,
        blogs,
      },
    });
    reply.status(201).send(user);
  });
};

module.exports = userRoutes;
