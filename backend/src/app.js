import express from "express";
import cors from "cors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import teamRouter from "./routes/team.routes.js";
import uploadRoute from "./routes/img_upload.route.js";
import participantRouter from "./routes/participant.routes.js";
import collectRouter from "./routes/collect.routes.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

app.use("/api/teams", teamRouter);
app.use("/api/participants", participantRouter);
app.use("/api/upload", uploadRoute);
app.use("/api/v1/collect", collectRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
