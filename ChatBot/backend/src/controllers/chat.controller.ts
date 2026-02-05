import { Request, Response, NextFunction } from "express";
import { chatService } from "../services/chat.service";

export const handleChatMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: "Message too long" });
    }

    const result = await chatService.processMessage(message, sessionId);

    res.json(result);
  } catch (error) {
    next(error);
  }
};