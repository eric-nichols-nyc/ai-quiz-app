import React from "react";
import { Card, CardContent } from "@/components/ui/card"

type FlashcardProps = {
  question: string;
  answer: string;
  isFlipped: boolean;
  onFlip: () => void;
};

const Flashcard = ({ question, answer, isFlipped, onFlip }: FlashcardProps) => {
  return (
    <div
      className="flashcard-container"
      onClick={onFlip}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onFlip();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      aria-label={isFlipped ? "Show question" : "Show answer"}
    >
      <Card className={`flashcard ${isFlipped ? 'flipped' : ''} h-full`}>
        <CardContent className="flashcard-front absolute w-full h-full flex items-center justify-center p-6">
          <p className="text-lg font-semibold text-center">{question}</p>
        </CardContent>
        <CardContent className="flashcard-back absolute w-full h-full flex items-center justify-center p-6">
          <p className="text-lg text-center">{answer}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Flashcard;