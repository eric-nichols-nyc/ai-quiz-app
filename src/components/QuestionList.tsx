import React, { useState } from 'react';
import QuestionCard from './QuestionCard';

type QuestionListProps = {
    questions: { id: string; question: string; answer: string }[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};

const QuestionList: React.FC<QuestionListProps> = ({ questions, onEdit, onDelete }) => {
    const [visibleAnswers, setVisibleAnswers] = useState<{ [key: string]: boolean }>({});

    const toggleAnswerVisibility = (id: string) => {
        setVisibleAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            {questions.map((question) => (
                <QuestionCard 
                    key={question.id} 
                    question={question} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                    isAnswerVisible={!!visibleAnswers[question.id]} 
                    toggleAnswerVisibility={() => toggleAnswerVisibility(question.id)} 
                />
            ))}
        </div>
    );
};

export default QuestionList; 