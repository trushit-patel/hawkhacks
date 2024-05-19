import React, { useState, useEffect } from "react";

function TypingAnimation({ text, speed }) {
  const [displayedText, setDisplayedText] = useState("");
  const [completedTyping, setCompletedTyping] = useState(false);

  useEffect(() => {
    setCompletedTyping(false);
    setDisplayedText("");
    let i = -1;
    const intervalId = setInterval(() => {
      if (i < text.length - 1) {
        setDisplayedText((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <span className="typing-animation">
      {displayedText}
      {!completedTyping && <CursorSVG />}
    </span>
  );
}

function CursorSVG() {
  return (
    <svg
      className="w-4 h-4 inline-block"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default TypingAnimation;
