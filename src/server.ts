import app from "./app";
import { connectRedis, redis } from "./redis";

async function start() {
  await connectRedis();

  const server = app.listen(8000, () => {
    console.log("Server running");
  });

  process.on("SIGINT", async () => {
    console.log("Shutting down...");

    await redis.quit();
    server.close(() => {
      process.exit(0);
    });
  });
}

start();