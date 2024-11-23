import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"

// Define TypeScript interface for component props
type FlashcardProps = {
  question: string; // Text shown on front of card
  answer: string;   // Text shown on back of card
};

/**
 * Flashcard Component
 * Renders an interactive flashcard that can be flipped to reveal an answer
 * 
 * @param {string} question - The question text displayed on the front
 * @param {string} answer - The answer text displayed on the back
 * @returns {JSX.Element} A flippable card component
 */
const Flashcard = ({ question, answer }: FlashcardProps) => {
  // Track whether card is showing question (false) or answer (true)
  const [isFlipped, setIsFlipped] = useState(false);

  /**
   * Toggles the card's flipped state when clicked or triggered
   */
  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      // Container for the flashcard with click handling
      className="flashcard-container"
      onClick={handleFlip}
      // Keyboard accessibility handlers
      onKeyDown={(e) => {
        // Allow flipping with Enter or Space key
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleFlip()
        }
      }}
      // Accessibility attributes
      tabIndex={0}                                    // Make div focusable
      role="button"                                   // Indicate it's clickable
      aria-pressed={isFlipped}                        // Track pressed state for screen readers
      aria-label={isFlipped ? "Show question" : "Show answer"} // Descriptive label
    >
      <Card className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        {/* Front face of the card (Question) */}
        <CardContent className="flashcard-front">
          <p className="text-lg font-semibold text-center">{question}</p>
        </CardContent>
        {/* Back face of the card (Answer) */}
        <CardContent className="flashcard-back">
          <p className="text-lg text-center">{answer}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Flashcard;