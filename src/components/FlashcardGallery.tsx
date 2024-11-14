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
        <Button 
          onClick={prevCard} 
          disabled={currentCardIndex === 0} 
          className={`px-4 py-2 rounded-lg transition duration-300 ${currentCardIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          Prev
        </Button>
        <div>{currentCardIndex + 1}/{flashcards.length}</div>
        <Button 
          onClick={nextCard} 
          disabled={currentCardIndex === flashcards.length - 1} 
          className={`px-4 py-2 rounded-lg transition duration-300 ${currentCardIndex === flashcards.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FlashcardGallery;
