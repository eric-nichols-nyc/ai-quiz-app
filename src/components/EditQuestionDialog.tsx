"use client";
import React from "react";
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

interface EditQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: { id: string; text: string; answer: string }; // Adjust based on your question structure
  onSave: (updatedQuestion: { id: string; text: string; answer: string }) => void;
}

const EditQuestionDialog: React.FC<EditQuestionDialogProps> = ({
  open,
  onOpenChange,
  question,
  onSave,
}) => {
  const [text, setText] = React.useState(question?.text);
  const [answer, setAnswer] = React.useState(question?.answer);

  const handleSave = () => {
    onSave({ id: question.id, text, answer });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Modify the details for the question.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="question" className="text-right">
              Question
            </Label>
            <Textarea
              id="question"
              className="col-span-3"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="answer" className="text-right">
              Answer
            </Label>
            <Textarea
              id="answer"
              className="col-span-3"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionDialog; 