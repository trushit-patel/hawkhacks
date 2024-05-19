const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up multer storage and file filter
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

async function rewriteCoverLetter(pdfTextArray, jobDescription) {
  const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
  const prompt = `Rewrite the following cover letter based on this job description:\n\nJob Description:\n${jobDescription}\n\nCover Letter:\n${pdfTextArray.join('\n\n')}`;

  try {
    const result = await model.generateContent(prompt);
    return result.response;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

app.post('/rewrite-cover-letter', upload.single('pdfFile'), async (req, res) => {
  if (!req.file || !req.body.jobDescription) {
    res.status(400).send('Missing required inputs');
    return;
  }

  try {
    const pdfData = await pdfParse(req.file.buffer);
    const pdfTextArray = pdfData.text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const jobDescription = req.body.jobDescription;

    const rewrittenCoverLetter = await rewriteCoverLetter(pdfTextArray, jobDescription);
    const textBody = rewrittenCoverLetter.candidates[0].content.parts[0].text;
    res.send(textBody);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error rewriting cover letter');
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
