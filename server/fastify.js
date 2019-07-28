// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
fastify.register(require("fastify-cors"), {
  // options would go here
});
const searchApplePodcasts = require("./searchApplePodcasts");

// Declare a route
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.get("/findPodcast", async (request, reply) => {
  console.log("/findPodcast route hit");
  const podcastName = request.query.name;
  const results = await searchApplePodcasts(podcastName);
  return reply.send({ results });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(8080);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
