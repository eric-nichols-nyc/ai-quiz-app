import { z } from "zod";

export const addQuestionToCategorySchema = z.object({
// export zod schema to add question to category
question: z.string().min(1, {
    message: "Question cannot be empty",
  }).max(500, {
    message: "Question cannot be longer than 500 characters",
  }).refine(
    (value) => !value.trim().endsWith('?'), 
    {
      message: "Question must end with a question mark (?)",
    }
  ),
  answer: z.string().min(1, {
    message: "Answer cannot be empty",
  }).max(1000, {
    message: "Answer cannot exceed 1000 characters",
  }).refine(
    (value) => value.trim().length >= 20,
    {
      message: "Answer must be at least 20 characters long for completeness",
    }
  ),
}).refine(
  (data) => data.question.toLowerCase() !== data.answer.toLowerCase(),
  {
    message: "Question and answer cannot be identical",
    path: ["answer"], // This will make the error appear on the answer field
  }
);