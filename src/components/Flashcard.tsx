import React, { useState } from "react"; // Import React and useState hook

// Define the props type for the Flashcard component
type FlashcardProps = {
  question: string; // The question text to display
  answer: string;   // The answer text to display
};

// Flashcard component definition
const Flashcard = ({ question, answer, isFlipped }: FlashcardProps & { isFlipped: boolean }) => {
  // State to manage whether the flashcard is flipped or not
  const [flipped, setFlipped] = useState(isFlipped); // Initialize state with the isFlipped prop

  // Determine the current text to display based on the flipped state
  const currentText = flipped ? answer : question;

  return (
    <div className="flashcard flex flex-col items-center justify-center">
      <div
        onClick={() => setFlipped(!flipped)} // Toggle the flipped state on click
        className="flex w-[560px] h-[340px] border rounded-lg p-4 items-center justify-center"
      >
        <p>{currentText}</p>
      </div>
    </div>
  );
};

export default Flashcard; // Export the Flashcard component for use in other files