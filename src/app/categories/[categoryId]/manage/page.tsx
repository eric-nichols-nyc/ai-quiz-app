"use client";
import React, { useState } from "react";
import { sampleCards } from "@/data/sampleData";
import QuestionList from "@/components/QuestionList";
import { Button } from "@/components/ui/button";
import AddQuestionDialog from "@/components/AddQuestionDialog";

const ManagePage = ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = params;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (id: string) => {
    console.log(`Edit question with id: ${id}`);
    // Implement your edit logic here
  };

  const handleDelete = (id: string) => {
    console.log(`Delete question with id: ${id}`);
    // Implement your delete logic here
  };

  return (
    <>
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold mb-4">
          Manage Questions in Category {categoryId}
        </h2>
        <Button className="mb-4" onClick={() => setIsDialogOpen(true)}>
          Add Question
        </Button>
        <QuestionList
          questions={sampleCards}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <AddQuestionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default ManagePage;
