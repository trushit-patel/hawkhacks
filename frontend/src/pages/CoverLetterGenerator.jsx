import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

function CoverLetterGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [coverLetterText, setCoverLetterText] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!coverLetterText || !jobDescriptionText) {
      alert("Please enter both cover letter text and job description.");
      return;
    }

    setIsLoading(true);
    setResponseText(""); // Clear previous response

    try {
      const response = await fetch(
        "http://localhost:3000/rewrite-cover-letter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coverLetter: coverLetterText,
            jobDescription: jobDescriptionText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();
      setResponseText(data);
    } catch (error) {
      console.error("Error generating cover letter:", error);
      setResponseText("Error generating cover letter.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-3xl w-full">
        <h1 className="text-3xl font-bold mb-6">Rewrite Cover Letter</h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <label className="font-bold text-lg mb-2">Cover Letter:</label>
          <textarea
            name="cover-letter"
            className="mb-4 font-bold py-2 px-4 rounded-xl w-full border-2 border-purple-600"
            rows="5"
            placeholder="Enter your resume text here"
            value={coverLetterText}
            onChange={(e) => setCoverLetterText(e.target.value)}
          />

          <label className="font-bold text-lg mb-2">Job Description:</label>
          <textarea
            name="job-description"
            className="mb-4 font-bold py-2 px-4 rounded-xl w-full border-2 border-purple-600"
            rows="5"
            placeholder="Enter your job description text here"
            value={jobDescriptionText}
            onChange={(e) => setJobDescriptionText(e.target.value)}
          />
          <div className="flex">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-xl"
            >
              {isLoading ? "Uploading..." : "Generate Cover Letter"}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-6 bg-white w-full p-4 rounded-2xl text-left">
        <ReactMarkdown children={responseText} />
      </div>
    </div>
  );
}

export default CoverLetterGenerator;
