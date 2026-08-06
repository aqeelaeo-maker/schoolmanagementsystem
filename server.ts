import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "AIzaSy_MOCK_FALLBACK_KEY",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Helper for AI generation
async function callGemini(prompt: string, systemInstruction?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: systemInstruction
        ? { systemInstruction, temperature: 0.7 }
        : { temperature: 0.7 },
    });
    return response.text;
  } catch (err: any) {
    console.error("Gemini API Error:", err?.message || err);
    throw new Error(err?.message || "AI Service unavailable");
  }
}

// --- AI API ENDPOINTS ---

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 2. Predict Performance
app.post("/api/ai/predict-performance", async (req, res) => {
  try {
    const { studentName, className, gpa, attendance, recentMarks } = req.body;
    const prompt = `Student: ${studentName}, Class: ${className}, Current GPA: ${gpa}/4.0, Attendance: ${attendance}%. Recent Marks: ${JSON.stringify(recentMarks)}. Provide a structured analysis with: 1) Predicted Final GPA, 2) Academic Risk Level (Low/Medium/High), 3) Key Strengths, 4) Improvement Areas, and 5) Actionable 2-sentence strategy for teachers/parents.`;
    const text = await callGemini(
      prompt,
      "You are an expert AI Educational Data Analyst for EduPulse AI School Management System. Provide supportive, actionable insights."
    );
    res.json({ success: true, insight: text });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Question Paper Generator
app.post("/api/ai/generate-question-paper", async (req, res) => {
  try {
    const { subject, className, chapter, difficulty, mcqCount, descriptiveCount } = req.body;
    const prompt = `Create a ${difficulty} difficulty exam question paper for ${subject} (${className}), Chapter: "${chapter}". Include ${mcqCount} Multiple Choice Questions (with options A,B,C,D) and ${descriptiveCount} Short/Long Answer Questions. At the end, append a clear Answer Key. Format neatly in Markdown.`;
    const text = await callGemini(
      prompt,
      "You are a master academic teacher creating balanced, high-quality school exam papers."
    );
    res.json({ success: true, paper: text });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Report Card Remarks Writer
app.post("/api/ai/report-writer", async (req, res) => {
  try {
    const { studentName, gpa, attendance, strengths, behavior } = req.body;
    const prompt = `Write a polished 3-4 sentence official report card remark for ${studentName}. GPA: ${gpa}, Attendance: ${attendance}%, Strengths: ${strengths}, Behavioral Traits: ${behavior}. Highlight achievements and encourage future growth.`;
    const text = await callGemini(
      prompt,
      "You are a compassionate school principal drafting official academic report card remarks."
    );
    res.json({ success: true, remarks: text });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Parent Reply Assistant
app.post("/api/ai/parent-reply-assistant", async (req, res) => {
  try {
    const { parentMessage, teacherName, studentName, tone } = req.body;
    const prompt = `Parent's message regarding student ${studentName}: "${parentMessage}". Draft a courteous, professional, and reassuring response from Teacher ${teacherName} in a ${tone || 'constructive'} tone.`;
    const text = await callGemini(
      prompt,
      "You are a polite, professional AI Assistant helping school teachers communicate with parents."
    );
    res.json({ success: true, reply: text });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Timetable Optimizer
app.post("/api/ai/optimize-timetable", async (req, res) => {
  try {
    const { currentSchedule, conflicts } = req.body;
    const prompt = `Analyze this school timetable schedule matrix and conflicts: ${JSON.stringify(conflicts)}. Suggest 3 specific period/room/teacher swaps to eliminate teacher over-allocation and room double-bookings while maintaining workload balance.`;
    const text = await callGemini(
      prompt,
      "You are an AI Operations Coordinator specializing in automated school schedule optimization."
    );
    res.json({ success: true, suggestions: text });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Fee Recovery Advisor
app.post("/api/ai/fee-recovery-advisor", async (req, res) => {
  try {
    const { studentName, pendingAmount, dueDate, parentName } = req.body;
    const prompt = `Draft a polite yet firm SMS & Email reminder to parent ${parentName} regarding pending tuition fee of $${pendingAmount} due on ${dueDate} for student ${studentName}. Include quick online payment link placeholder.`;
    const text = await callGemini(
      prompt,
      "You are a courteous school accounts manager communicating fee deadlines to parents."
    );
    res.json({ success: true, reminder: text });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. General AI Chatbot Assistant
app.post("/api/ai/chatbot", async (req, res) => {
  try {
    const { message, userRole, schoolName } = req.body;
    const prompt = `User (${userRole}) asks: "${message}". Context: EduPulse AI System at ${schoolName || 'St. Jude International Academy'}. Answer helpful, concise, and smart.`;
    const text = await callGemini(
      prompt,
      "You are EduPulse AI - the intelligent AI co-pilot for school administrators, teachers, students, and parents."
    );
    res.json({ success: true, reply: text });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- VITE / STATIC SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EduPulse AI Server running at http://localhost:${PORT}`);
  });
}

startServer();
