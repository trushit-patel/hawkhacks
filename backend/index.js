const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { registerUser, loginUser, logoutUser, refreshToken, getProfile } = require("./user-auth");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const mongoose = require('./models/user');
const verifyJWT = require('./middlewares/auth');

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
 
app.use(express.json({ limit: "16kb" }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up multer storage and file filter
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

async function handleResumeRating(req, res) {
  try {
    const resume = req.file;

    if (!resume) {
      return res.status(400).send("No file uploaded");
    }

    const result = await pdfParse(resume.buffer);

    const pdfTextArray = result.text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const model = await genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const prompt = "Rate the following resume:\n\n" + pdfTextArray.join("\n\n");

    const response = await model.generateContent(prompt);
    const candidates = response.response.candidates;
    if (candidates && candidates.length > 0) {
      const firstCandidate = candidates[0];
      if (
        firstCandidate &&
        firstCandidate.content &&
        firstCandidate.content.parts &&
        firstCandidate.content.parts.length > 0
      ) {
        const textBody = firstCandidate.content.parts[0].text;

        res.status(200).send(textBody);
      } else {
        console.error("Unexpected candidate structure:", firstCandidate);
        res.status(500).send("Unexpected candidate structure from AI model");
      }
    } else {
      console.error("Unexpected response structure:", response);
      res.status(500).send("Unexpected response structure from AI model");
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Error processing request");
  }
}

async function handleCoverLetterGeneration(req, res) {
  const { coverLetter, jobDescription } = req.body;

  if (!coverLetter || !jobDescription) {
    res.status(400).send("Missing required inputs");
    return;
  }

  try {
    // Sanitize input by removing any control characters
    const sanitizeInput = (input) => input.replace(/[\x00-\x1F\x7F-\x9F]/g, "");

    const sanitizedCoverLetter = sanitizeInput(coverLetter);
    const sanitizedJobDescription = sanitizeInput(jobDescription);

    // Split the cover letter into an array of trimmed, non-empty lines
    const coverLetterArray = sanitizedCoverLetter
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const model = await genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const prompt = `Rewrite the following cover letter based on this job description:\n\nJob Description:\n${sanitizedJobDescription}\n\nCover Letter:\n${coverLetterArray.join(
      "\n\n"
    )}`;

    const result = await model.generateContent(prompt);
    const rewrittenCoverLetter = result.response;
    const textBody = rewrittenCoverLetter.candidates[0].content.parts[0].text;

    res.status(200).send(textBody);
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).send("Error rewriting cover letter");
  }
}
async function handleJobRolesSuggestion(req, res) {
  try {
    const resume = req.file;

    if (!resume) {
      return res.status(400).send("No file uploaded");
    }

    const result = await pdfParse(resume.buffer);

    const pdfTextArray = result.text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const model = await genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const prompt =
      "Read the attached resume and Give job role suggestions(with descriptions and reasons) accordingly (no need to give context or add considerations or tips)\n\n" +
      pdfTextArray.join("\n\n");

    const response = await model.generateContent(prompt);
    const candidates = response.response.candidates;
    if (candidates && candidates.length > 0) {
      const firstCandidate = candidates[0];
      if (
        firstCandidate &&
        firstCandidate.content &&
        firstCandidate.content.parts &&
        firstCandidate.content.parts.length > 0
      ) {
        const textBody = firstCandidate.content.parts[0].text;

        res.status(200).send(textBody);
      } else {
        console.error("Unexpected candidate structure:", firstCandidate);
        res.status(500).send("Unexpected candidate structure from AI model");
      }
    } else {
      console.error("Unexpected response structure:", response);
      res.status(500).send("Unexpected response structure from AI model");
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Error processing request");
  }
}

app.post("/reveiw-resume", upload.single("resume"), handleResumeRating);

app.post("/rewrite-cover-letter", handleCoverLetterGeneration);

app.post(
  "/job-roles-suggest",
  upload.single("resume"),
  handleJobRolesSuggestion
);

app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/logout", verifyJWT, logoutUser);
app.post("/refresh-token",verifyJWT, refreshToken);
app.get("/profile",verifyJWT, getProfile);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
