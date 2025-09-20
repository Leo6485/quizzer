import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import gen_quiz from "./src/api/gen_quiz.js";
import gen_quiz_file from "./src/api/gen_quiz_file.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.get("/api/gen_quiz", (req, res) => {
    console.log("/api")
    gen_quiz(req, res)
});
app.post("/api/gen_quiz_file", (req, res) => gen_quiz_file(req, res));

app.use(express.static(path.join(__dirname, "build")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
