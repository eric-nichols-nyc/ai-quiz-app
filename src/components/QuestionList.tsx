"use client";
import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import { Button } from "./ui/button";
import AddQuestionDialog from "./AddQuestionDialog";
import useAddQuestion from "@/hooks/useAddQuestion";
import useDeleteQuestion from "@/hooks/useDeleteQuestion";
import { Card } from "./ui/card";
import { Plus } from "lucide-react";

type QuestionListProps = {
  questions: { id: string; question: string; answer: string }[];
  categoryId: string;
};

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  categoryId,
}) => {
  const { addQuestion, updateQuestionMutation } = useAddQuestion(categoryId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddQuestion = async (question: string, answer: string) => {
    setIsDialogOpen(false);
    addQuestion({ categoryId, question, answer });
  };

   const handleEdit = ({id, question, answer}: {id: string, question: string, answer: string}) => {
    updateQuestionMutation({id, question, answer});
  };

  const deleteQuestion = useDeleteQuestion();

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <Card 
        className="w-full p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50"
        onClick={() => setIsDialogOpen(true)}
        role="button"
        tabIndex={0}
      >
        <div className="flex flex-col items-center gap-2">
          <Plus className="h-8 w-8 text-gray-500" />
          <span className="font-semibold text-gray-500">Add Question</span>
        </div>
      </Card>
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onEdit={handleEdit}
          onDelete={() => deleteQuestion(question.id)}
        />
      ))}

      <AddQuestionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddQuestion}
      />
    </div>
  );
};

export default QuestionList;
