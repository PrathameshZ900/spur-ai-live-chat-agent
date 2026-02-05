import { Router } from "express";
import { handleChatMessage } from "../controllers/chat.controller";

const router = Router();

router.post("/message", handleChatMessage);

export default router;