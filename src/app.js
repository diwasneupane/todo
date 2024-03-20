import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//importing route
import userRouter from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todo", todoRoutes);

export { app };
