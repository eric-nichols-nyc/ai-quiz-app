import React from 'react';
import Flashcard from './Flashcard';

const FlashcardGallery = () => {
    const flashcards = [
        { question: 'What is 2 + 2?', answer: '4' },
        { question: 'What is the capital of France?', answer: 'Paris' },
    ]; // Example flashcards

    return (
        <div className="gallery">
            {flashcards.map((flashcard, index) => (
                <Flashcard key={index} question={flashcard.question} answer={flashcard.answer} />
            ))}
        </div>
    );
};

export default FlashcardGallery; 