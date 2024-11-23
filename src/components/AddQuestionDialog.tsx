"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addQuestionToCategorySchema } from "@/schemas";
import { ZodError } from "zod";

interface AddQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (question: string, answer: string) => void;
}

const AddQuestionDialog: React.FC<AddQuestionDialogProps> = ({ open, onOpenChange, onSubmit }) => {
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    
    const formData = new FormData(e.currentTarget);
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;

    try {
      const validationResult = addQuestionToCategorySchema.parse({ question, answer });
      onSubmit(question, answer);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
          <DialogDescription>
            Fill in the details for the new question.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="question" className="text-right">
              Question
            </Label>
            <div className="col-span-3">
              <Textarea id="question" name="question" />
              {errors.question && (
                <p className="text-sm text-red-500 mt-1">{errors.question}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="answer" className="text-right">
              Answer
            </Label>
            <div className="col-span-3">
              <Textarea id="answer" name="answer" />
              {errors.answer && (
                <p className="text-sm text-red-500 mt-1">{errors.answer}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Question</Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setErrors({});
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionDialog; 