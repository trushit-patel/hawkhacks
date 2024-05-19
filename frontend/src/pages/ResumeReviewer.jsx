import React, { useState } from "react";
import TypingAnimation from "../components/TypingAnimation.jsx";
import ReactMarkdown from "react-markdown";

const responseText = `This resume is strong overall, demonstrating a solid foundation of technical skills and relevant experience. However, there are some areas for improvement:

**Strengths:**

* **Clear and Concise:** The resume is easy to read and follows a logical structure.
* **Quantifiable Achievements:** You provide specific numbers and metrics to showcase the impact of your work (e.g., 20% increase in team efficiency, 25%-30% engagement enhancement).
* **Strong Skills Section:**  You highlight a wide range of programming languages, frameworks, databases, and tools, demonstrating your versatility.
* **Relevant Coursework:** The resume effectively lists coursework related to your target field.
* **Projects:**  You showcase two impressive projects with clear descriptions, technology stacks, and links for potential employers to evaluate your work.
* **Certifications:**  You list relevant certifications demonstrating your commitment to continuous learning.
* **Awards:** You showcase your achievements in competitions and coding platforms, highlighting your problem-solving abilities.

**Areas for Improvement:**

* **Formatting:** 
    * **Contact Information:** The current formatting of contact information is unconventional and may look unprofessional. Use a more standard format (e.g., Name, Email, Phone Number, LinkedIn).
    * **Headings:** Use a consistent font and size for all headings. Consider using bold or italics for emphasis.
    * **Spacing:** Add more white space between sections to make the resume more visually appealing and easier to read.
* **Content:**
    * **Highlights of Qualifications:** The bullet point is too long and should be broken into two or three shorter ones.  Instead of "eligible for Co-op opportunity," say "Seeking a [duration] Co-op opportunity."
    * **Work Experience:** While you provide good descriptions, consider making each bullet point more action-oriented. Use strong verbs to highlight what you accomplished (e.g., "Developed and implemented," "Designed and deployed," "Led a team of...," etc.). 
    * **Projects:** Expand on the accomplishments of each project.  Mention specific challenges you faced and how you overcame them. 
* **Proofreading:** Proofread carefully for grammar and spelling errors. There are a few instances of incorrect capitalization ("MasterofEngineering" should be "Master of Engineering").
* **Tailoring:**  It's important to tailor your resume to the specific job requirements of each position you apply for. Make sure to highlight the skills and experiences most relevant to the role you are targeting.

**Overall:** This is a strong resume that highlights your skills and achievements. By making the suggested improvements, you can make it even more compelling and professional. 

Good luck with your job search!`;
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
