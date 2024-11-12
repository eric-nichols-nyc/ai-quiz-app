import React from 'react';

type FlashcardProps = {
    question: string;
    answer: string;
}
const Flashcard = ({ question, answer }: FlashcardProps) => {
    const [isFlipped, setIsFlipped] = React.useState(false);

    return (
        <div onClick={() => setIsFlipped(!isFlipped)} className="flashcard">
            {isFlipped ? <p>{answer}</p> : <p>{question}</p>}
        </div>
    );
};

export default Flashcard; 