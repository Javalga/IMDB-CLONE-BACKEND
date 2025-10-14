import Fastify from "fastify";
import path from "node:path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import AutoLoad from "@fastify/autoload";
import cors from "@fastify/cors";

const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.dirname(__filename);
const srcDir = path.join(projectRoot, "src");

dotenv.config();

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: { colorize: true },
    },
  },
});
fastify.register(cors, {
  origin: true,
});

fastify.register(AutoLoad, {
  dir: path.join(srcDir, "plugins"),
});

fastify.register(AutoLoad, {
  dir: path.join(srcDir, "routes"),
});

fastify.addHook("onReady", async () => {
  console.log(fastify.printRoutes());
});

const start = async () => {
  try {
    fastify.listen({ port: process.env.PORT || 3000 });
    console.log(
      `Server running on http://localhost:${process.env.PORT || 3000}`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
