import express from "express"
import routes from "./routes"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./routes/error"

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api", routes)

app.use(errorHandler)

export default app