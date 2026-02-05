import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chatRoutes);

app.use(errorHandler);

export default app;