"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories, updateQuestion } from "@/actions/actions";
import QuestionCard from "./QuestionCard";
import { Button } from "./ui/button";
import AddQuestionDialog from "./AddQuestionDialog";
import useAddQuestion from "@/hooks/useAddQuestion";
import useDeleteQuestion from "@/hooks/useDeleteQuestion";

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
      <Button className="mb-4" onClick={() => setIsDialogOpen(true)}>
        Add Question
      </Button>
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onEdit={handleEdit}
          onDelete={() => deleteQuestion(question.id)}
          isAnswerVisible={true}
          toggleAnswerVisibility={() => {}}
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
