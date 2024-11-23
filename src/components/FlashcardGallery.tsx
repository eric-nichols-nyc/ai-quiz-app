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
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | ''>('');

    const prevCard = () => {
      setSlideDirection('right');
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex - 1);
        setSlideDirection('');
      }, 300);
    };
  
    const nextCard = () => {
      setSlideDirection('left');
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1);
        setSlideDirection('');
      }, 300);
    };

    const handleFlip = () => {
      if (!slideDirection) {  // Only allow flipping when not transitioning
        setIsFlipped(!isFlipped);
      }
    }
  return (
    <div className="gallery flex items-center flex-col justify-center gap-3">
      <div className="w-[560px] h-[340px] overflow-hidden ">
      <div className={`slide-container size-full ${slideDirection}`} style={{ pointerEvents: slideDirection ? 'none' : 'auto' }}>
          <Flashcard
            key={flashcards[currentCardIndex].id || currentCardIndex}
            question={flashcards[currentCardIndex].question}
            answer={flashcards[currentCardIndex].answer}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        </div>
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
