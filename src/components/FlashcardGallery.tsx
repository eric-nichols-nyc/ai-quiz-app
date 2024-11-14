"use client";
import React, { useState } from "react";
import Flashcard from "./Flashcard";
import { Card } from "@prisma/client";
import { Button } from "./ui/button";

type FlashcardGalleryProps = {
  flashcards: Card[];
};

const FlashcardGallery = ({ flashcards }: FlashcardGalleryProps) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

  const prevCard = () => {
    setCurrentCardIndex(currentCardIndex - 1);
    setIsFlipped(false);
  };

  const nextCard = () => {
    setCurrentCardIndex(currentCardIndex + 1);
    setIsFlipped(false);
  };
  return (
    <div className="gallery flex items-center flex-col justify-center gap-3">
      <div className="w-[560px] h-[340px] overflow-hidden border-2 border-red-500">
        <Flashcard
          key={currentCardIndex}
          question={flashcards[currentCardIndex].question}
          answer={flashcards[currentCardIndex].answer}
          isFlipped={isFlipped}
        />
      </div>
      <div className="flex justify-between items-center gap-3">
        <Button onClick={prevCard}>Prev</Button>
        <div>{currentCardIndex + 1}/{flashcards.length}</div>
        <Button onClick={nextCard}>Next</Button>
      </div>
    </div>
  );
};

export default FlashcardGallery;
