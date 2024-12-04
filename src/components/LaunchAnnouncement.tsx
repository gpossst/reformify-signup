import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function LaunchAnnouncement() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show announcement after a short delay
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-accent text-foreground p-4 text-center font-fredoka transition-transform duration-500 z-[100] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-4xl mx-auto relative">
        🚀 Reformify launches Tuesday, December 10th!
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-0 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
          aria-label="Close announcement"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
}
