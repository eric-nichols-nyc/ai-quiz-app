import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/actions/actions';
import QuestionCard from './QuestionCard';

type QuestionListProps = {
    questions: { id: string; question: string; answer: string }[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    categoryId: string;
};

const QuestionList: React.FC<QuestionListProps> = ({ questions, onEdit, onDelete, categoryId }) => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    const category = categories?.find(cat => cat.id === categoryId);

    return (
        <div>
            {isLoading && <div>Loading categories...</div>}
            {category && <h2 className="font-bold text-lg">{category.name}</h2>}
            {questions.map((question) => (
                <QuestionCard
                    key={question.id}
                    question={question}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isAnswerVisible={true}
                    toggleAnswerVisibility={() => {}}
                />
            ))}
        </div>
    );
};

export default QuestionList; 