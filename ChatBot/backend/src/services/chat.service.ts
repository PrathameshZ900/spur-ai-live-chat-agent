import { PrismaClient } from "@prisma/client";
import { generateReply } from "./llm.service";

const prisma = new PrismaClient();

export const chatService = {
  async processMessage(message: string, sessionId?: string) {
    let conversation;

    // 🔎 1. Find existing conversation
    if (sessionId) {
      conversation = await prisma.conversation.findUnique({
        where: { id: sessionId },
      });
    }

    // 🆕 2. Create new conversation if not found
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {},
      });
    }

    // 💾 3. Save user message
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        sender: "user",
        text: message,
      },
    });

    const lowerMessage = message.toLowerCase();

    // 🧠 4. MEMORY EXTRACTION (example: name)
    if (lowerMessage.includes("my name is")) {
      const name = message.split(/my name is/i)[1]?.trim();

      if (name) {
        await prisma.userMemory.upsert({
          where: {
            conversationId_key: {
              conversationId: conversation.id,
              key: "user_name",
            },
          },
          update: { value: name },
          create: {
            conversationId: conversation.id,
            key: "user_name",
            value: name,
          },
        });
      }
    }

    // 📚 5. Fetch memory for this conversation
    const memories = await prisma.userMemory.findMany({
      where: { conversationId: conversation.id },
    });

    // ⚡ Optional: Fast direct answer (no LLM needed)
    if (lowerMessage.includes("what is my name")) {
      const nameMemory = memories.find(
        (m) => m.key === "user_name"
      );

      if (nameMemory) {
        const reply = `Your name is ${nameMemory.value}.`;

        await prisma.message.create({
          data: {
            conversationId: conversation.id,
            sender: "ai",
            text: reply,
          },
        });

        return { reply, sessionId: conversation.id };
      }
    }

    // 🧾 Convert memory into prompt-friendly format
    const memoryContext = memories
      .map((m) => `${m.key}: ${m.value}`)
      .join("\n");

    // 🕒 6. Fetch last 10 messages for history
    const history = await prisma.message.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    // 🤖 7. Generate AI reply with memory
    const reply = await generateReply(
      history,
      message,
      memoryContext
    );

    // 💾 8. Save AI reply
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        sender: "ai",
        text: reply,
      },
    });

    return { reply, sessionId: conversation.id };
  },
};