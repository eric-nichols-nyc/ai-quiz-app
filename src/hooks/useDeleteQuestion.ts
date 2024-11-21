import { deleteQuestionFromCategory } from "@/actions/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type AddQuestionProps = {
    categoryId: string;
    question: string;
    answer: string;
}

export default function useDeleteQuestion() {
    const queryClient = useQueryClient();
    const { mutate: deleteQuestion } = useMutation({
        mutationFn: (id: string) => deleteQuestionFromCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cards"] });
            console.log("Question deleted successfully");
        },
        onError: (error: Error) => {
            console.error("Error adding question:", error);
        }
    });

    return deleteQuestion;
}