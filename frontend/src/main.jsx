import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage.jsx";
import ResumeReviewer from "./pages/ResumeReviewer.jsx";
import CoverLetterGenerator from "./pages/CoverLetterGenerator.jsx";
import JobSuggestions from "./pages/JobSuggestions.jsx";
import JobTracker from "./pages/JobTracker.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Footer from "./components/Footer.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },

      { path: "/resume-reviewer", element: <ResumeReviewer /> },
      { path: "/cover-letter-generator", element: <CoverLetterGenerator /> },
      { path: "/job-suggestions", element: <JobSuggestions /> },
      { path: "/job-tracker", element: <JobTracker /> },
    ],
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
        <Footer />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <SignUp />
        <Footer />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
