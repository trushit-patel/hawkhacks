const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
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
    // Check if a PDF file is uploaded
    if (!resume) {
      return res.status(400).send("No file uploaded");
    }

    // Parse the uploaded PDF file
    const result = await pdfParse(resume.buffer);

    // Extract text from PDF and split into an array of lines
    const pdfTextArray = result.text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // Get generative AI model
    const model = await genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    // Create prompt for the generative model
    const prompt = "Rate the following resume:\n\n" + pdfTextArray.join("\n\n");

    // Generate content using the generative model
    const response = await model.generateContent(prompt);

    // Extract text from the generated response
    const textBody = response.candidates[0].content.parts[0].text;
    console.log(textBody);

    // Send the generated text as response
    res.send(textBody);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Error processing request");
  }
}

async function handleCoverLetterGeneration(req, res) {}

async function handleJobRolesSuggestion(req, res) {}

app.post("/rate-resume", upload.single("resume"), handleResumeRating);
app.post(
  "/cover-letter-generator",
  upload.single("resume"),
  handleCoverLetterGeneration
);
app.post(
  "/job-roles-suggest",
  upload.single("resume"),
  handleJobRolesSuggestion
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
