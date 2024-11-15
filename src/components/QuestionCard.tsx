import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

type QuestionCardProps = {
    question: { id: string; question: string; answer: string };
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    isAnswerVisible: boolean;
    toggleAnswerVisibility: () => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onEdit, onDelete, isAnswerVisible, toggleAnswerVisibility }) => {
    return (
        <Card className="w-full p-4 flex flex-col justify-between">
            <div>
                <h3 className="font-semibold">{question.question}</h3>
                {isAnswerVisible && <p className="text-sm text-gray-600">{question.answer}</p>}
            </div>
            <div className="flex gap-2 mt-2">
                <Button 
                    onClick={() => onEdit(question.id)} 
                    className="bg-blue-500 text-white"
                >
                    <Edit className="h-4 w-4" />
                </Button>
                <Button 
                    onClick={() => onDelete(question.id)} 
                    className="bg-red-500 text-white"
                >
                    <Trash className="h-4 w-4" />
                </Button>
                <Button 
                    onClick={toggleAnswerVisibility}
                    className="bg-gray-500 text-white"
                >
                    {isAnswerVisible ? 'Hide Answer' : 'Show Answer'}
                </Button>
            </div>
        </Card>
    );
};

export default QuestionCard; 