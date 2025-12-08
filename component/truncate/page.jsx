import React, { useState } from "react";

export const Truncated = ({ text, limit = 250 }) => {
  const [expanded, setExpanded] = useState(false);
  const isTruncated = text.length > limit;
  const displayText =
    expanded || !isTruncated ? text : text.slice(0, limit) + "...";

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <p>{displayText}</p>
      {isTruncated && (
        <button
          onClick={toggleExpanded}
          className="text-blue-500 underline mt-2"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};
