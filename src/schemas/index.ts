import { z } from "zod";

// export zod schema to add question to category
export const addQuestionToCategorySchema = z.object({
    question: z.string(),
    answer: z.string(),
});