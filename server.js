import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// ✅ Allow frontend (React) to connect to backend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../soloapp/build")));

app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is working!" });
});

// Dummy SOS endpoint for testing
app.post("/send-sos", (req, res) => {
  console.log("📡 Received SOS request:", req.body);
  res.json({ ok: true, sent: req.body.contacts?.length || 0 });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../soloapp/build/index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 SoloSafe backend running at http://localhost:${PORT}`);
});
