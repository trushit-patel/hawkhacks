import React, { useState } from "react";
import TypingAnimation from "../components/TypingAnimation.jsx";
import ReactMarkdown from "react-markdown";

function ResumeReviewer() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const file = formData.get("resume");

    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    setIsLoading(true);
    setResponseText(""); // Clear previous response

    try {
      const response = await fetch("http://localhost:3000/reveiw-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();
      setResponseText(data);
    } catch (error) {
      console.error("Error uploading file:", error);
      setResponseText("Error reviewing resume.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-3xl">
        <h1 className="text-3xl font-bold mb-6">Resume Reviewer</h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            type="file"
            name="resume"
            className="mb-4 font-bold py-2 px-4 rounded-xl text-center w-5/6"
            accept="application/pdf"
          />
          <div className="flex">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-xl"
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-6 bg-white w-5/6 p-4 rounded-2xl text-left">
        <ReactMarkdown children={responseText} />
      </div>
    </div>
  );
}

export default ResumeReviewer;
