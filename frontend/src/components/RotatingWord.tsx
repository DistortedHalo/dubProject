import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { renderMarkedText } from "../textFormat";

type RotatingWordProps = {
  words: string[];
};

export function RotatingWord({ words }: RotatingWordProps) {
  const normalizedWords = words.length ? words : ["in culture."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % normalizedWords.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, [normalizedWords.length]);

  const word = normalizedWords[index];
  const isFlashing = /##\{?[^#]+\}?##/.test(word);

  return (
    <span className="word-rotator-slot" style={{ perspective: "800px" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`inline-block whitespace-nowrap ${isFlashing ? "word-rotator-flicker" : ""}`}
          style={{ transformOrigin: "50% 50%" }}
        >
          {renderMarkedText(word)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
