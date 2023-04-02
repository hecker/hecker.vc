import React from "react";

interface CalloutProps {
  text: string;
  emoji: string;
}

const Callout: React.FC<CalloutProps> = ({ text, emoji }) => {
  return (
    <div className="p-4 dark:bg-neutral-800 rounded-lg shadow-md flex items-center">
      <div className="text-2xl mr-4">{emoji}</div>
      <div className="dark:text-white">{text}</div>
    </div>
  );
};

export default Callout;
