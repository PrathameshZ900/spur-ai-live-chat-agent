# 🚀 Spur AI Live Chat Agent

A full-stack AI-powered live chat support system built with **Node.js, TypeScript, Express, MongoDB (Prisma), React, and Groq LLM API**.

This project simulates a modern AI customer support assistant capable of maintaining conversation context, persisting chat history, and generating intelligent responses in real-time.

---

## ✨ Features

- 💬 Real-time AI chat interface
- 🧠 Context-aware responses (conversation memory)
- 🗄 Persistent chat storage using MongoDB
- ⚡ Fast LLM integration using Groq
- 🎨 Modern full-screen responsive UI
- 🔁 Session-based conversation tracking
- 🛡 Robust error handling
- 🧱 Clean architecture (Routes → Controllers → Services → Data Layer)

---

## 🏗 Tech Stack

### Backend
- Node.js
- TypeScript
- Express
- MongoDB
- Prisma ORM
- Groq LLM API
- dotenv

### Frontend
- React (Vite)
- Modern responsive CSS
- Session storage for chat continuity

---

## 🧠 Architecture Overview

The backend follows clean separation of concerns:


Routes → Controllers → Services → Prisma (DB)
↓
LLM Service


- **Routes** handle HTTP endpoints
- **Controllers** validate input & orchestrate logic
- **Services** contain business logic
- **Prisma** manages database operations
- **LLM Service** encapsulates AI provider logic

This structure allows:
- Easy LLM provider switching
- Better scalability
- Clear maintainability
- Channel extensibility (WhatsApp, Instagram, etc.)

---

## 🗄 Database Schema

### Conversation
- id
- createdAt
- updatedAt

### Message
- id
- conversationId
- sender ("user" | "ai")
- text
- createdAt

All conversations are persisted and associated with a sessionId.

---

## 🤖 LLM Integration

Provider: **Groq**
Model: `llama-3.1-8b-instant`

The system:
- Injects a structured system prompt
- Passes recent conversation history
- Handles API failures gracefully
- Limits max tokens for cost control

---

## 🧠 Memory System

The chatbot maintains:
- Session-based memory (conversation history)
- Contextual continuity across messages
- Database persistence for reload support

Future improvements could include:
- Conversation summarization
- Vector-based semantic memory (RAG)
- Long-term user preference storage

---

## 🎨 UI Highlights

- Full-screen immersive layout
- Modern glassmorphism styling
- Typing animation
- Auto-scroll to latest message
- Responsive design (desktop & mobile)
- Clean chat bubble differentiation

---

# ⚙️ Setup Instructions

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/spur-ai-live-chat-agent.git
cd spur-ai-live-chat-agent

2️⃣ Backend Setup

cd backend
npm install

Create .env
PORT=5000
DATABASE_URL="your_mongodb_connection_string"
GROQ_API_KEY="your_groq_api_key"
GROQ_MODEL="llama-3.1-8b-instant"
Generate Prisma Client
npx prisma generate
npx prisma db push
Start Backend
npm run dev

Server runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🧪 Test Scenarios

Try:

"Hello"

"What is your return policy?"

"Do you ship to USA?"

Long message

Refresh page (chat persists)

🛡 Error Handling

Input validation (empty message rejection)

API failure fallback message

Graceful rate-limit handling

No server crashes on invalid input

📈 Scalability Considerations

If scaling to production:

Horizontal backend scaling behind load balancer

Redis for session caching

Rate limiting middleware

Vector database for retrieval-based responses

Monitoring & logging (Sentry, Winston)

Token usage tracking

🔮 Future Improvements

Streaming responses (real-time token rendering)

Markdown rendering support

Authentication system

Multi-channel integration (WhatsApp, Instagram)

Admin dashboard

Analytics & conversation insights

Smart memory summarization

💡 Why This Project Matters

This project demonstrates:

Clean backend architecture

AI system integration

Conversation persistence

Cost-aware LLM usage

Product-level UX thinking

Extensible system design

It closely resembles what a founding engineer would build for a modern AI customer engagement platform.

👨‍💻 Author

Prathamesh Magar

Full-stack developer focused on AI systems, backend architecture, and scalable product design.

⭐ If You Like This Project

Give it a star ⭐
Feel free to fork and improve it.



---


# 🎯 Why This README Is Strong


This README:


- Shows technical depth  
- Shows product thinking  
- Shows architecture clarity  
- Shows scalability awareness  
- Sounds professional  
- Impresses interviewers  


---


If you want, I can now give you:


- 🧠 “Recruiter-friendly” shorter version
- 🏆 Enterprise-level README
- 📦 Deployment section for Render/Vercel
- 🔥 Badge-enhanced premium GitHub version
- 💬 How to pitch this in 60 seconds confidently


Tell me what level you want 🚀
