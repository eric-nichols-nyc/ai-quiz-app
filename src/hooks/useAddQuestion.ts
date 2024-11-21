import { addQuestionToCategory } from "@/actions/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddQuestionProps = {
    categoryId: string;
    question: string;
    answer: string;
}

export default function useAddQuestion(categoryId: string) {
    const queryClient = useQueryClient();
    const { mutate: addQuestion } = useMutation({
        mutationFn: (props: AddQuestionProps) => addQuestionToCategory(categoryId, props.question, props.answer),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cards", categoryId] });
            console.log("Question added successfully");
        },
        onError: (error: Error) => {
            console.error("Error adding question:", error);
        }
    });

    return addQuestion;
}