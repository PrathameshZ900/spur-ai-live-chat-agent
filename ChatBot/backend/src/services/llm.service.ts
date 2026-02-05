import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateReply = async (
  history: any[],
  userMessage: string,
  memoryContext?: string
): Promise<string> => {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("Missing Groq API Key");
    }

    // 🧠 Construct system prompt with memory injection
    const systemPrompt = `
You are a friendly, intelligent AI assistant similar to ChatGPT.

========================
USER MEMORY
========================
${memoryContext && memoryContext.trim() !== ""
        ? memoryContext
        : "No stored user information available."}

MEMORY RULES:
- Use stored memory ONLY if relevant to the user's current question.
- If the user asks about themselves (name, preferences, etc.), use memory.
- Never invent information not present in memory.
- If no memory exists, do not guess.

========================
PERSONALITY
========================
- Helpful, calm, and supportive
- Friendly but not overly casual
- Clear and easy to understand
- Professional but human

========================
GENERAL GUIDELINES
========================
- Keep responses natural and conversational.
- Avoid marketing language.
- Do not mention any store unless asked about policies.
- Keep answers concise unless detail is needed.
- Use simple language suitable for students.
- Do not use emojis unless the user does.

If the user greets you (hi, hello, hey):
Respond briefly like:
"Hi! How can I help you today?"

If the user asks about store policies, use this information:

Shipping:
- 5–7 business days
- Free shipping above $50
- Ships to USA, Canada, UK

Returns:
- 30-day return
- Unused items only
- Refund within 5–10 business days

Support hours:
- Mon–Fri 9AM–6PM EST
`;

    // 📝 Build conversation messages
    const messages = [
      { role: "system", content: systemPrompt },

      // Past conversation history
      ...history.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),

      // Current user message
      { role: "user", content: userMessage },
    ];

    // 🚀 Call Groq
    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama3-8b-8192",
      messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    return (
      response.choices?.[0]?.message?.content?.trim() ||
      "No response generated."
    );
  } catch (error: any) {
    console.error("Groq Error:", error);

    if (error?.status === 429) {
      return "Too many requests. Please wait a moment and try again.";
    }

    if (error?.status === 401) {
      return "Invalid API key configuration.";
    }

    return "Sorry, I’m having trouble responding right now. Please try again.";
  }
};