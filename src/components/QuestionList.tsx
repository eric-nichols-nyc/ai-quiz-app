import React from 'react';
import QuestionCard from './QuestionCard';

type QuestionListProps = {
    questions: { id: string; question: string; answer: string }[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};

const QuestionList: React.FC<QuestionListProps> = ({ questions, onEdit, onDelete }) => {
    return (
        <div>
            {questions.map((question) => (
                <QuestionCard
                    key={question.id}
                    question={question}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isAnswerVisible={false}
                    toggleAnswerVisibility={() => {}}
                />
            ))}
        </div>
    );
};

export default QuestionList; 