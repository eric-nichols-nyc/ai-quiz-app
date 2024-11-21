"use client";
import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/actions/actions';
import QuestionCard from './QuestionCard';
import { Button } from './ui/button';
import AddQuestionDialog from "./AddQuestionDialog";

type QuestionListProps = {
    questions: { id: string; question: string; answer: string }[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    categoryId: string;
};

const QuestionList: React.FC<QuestionListProps> = ({ questions, onEdit, onDelete, categoryId }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    return (
        <div>
            <Button className="mb-4" onClick={() => setIsDialogOpen(true)}>
          Add Question
        </Button>
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

<AddQuestionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

        </div>
    );
};

export default QuestionList; 