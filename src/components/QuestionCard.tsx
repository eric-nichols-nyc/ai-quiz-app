import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import EditQuestionDialog from '@/components/EditQuestionDialog';
import AlertDialog from '@/components/AlertDialog';

type QuestionCardProps = {
    question: { id: string; question: string; answer: string };
    onEdit: ({id, question, answer}: {id: string, question: string, answer: string}) => void;
    onDelete: (id: string) => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onEdit, onDelete }) => {
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);

    const handleEdit = () => {
        setEditDialogOpen(true);
    };

    const handleDelete = () => {
        setAlertDialogOpen(true);
    };

    const toggleAnswerVisibility = () => {
        setIsAnswerVisible(prev => !prev);
    };

    return (
        <Card className="w-full p-4 flex flex-col justify-between">
            <div>
                <h3 className="font-semibold">{question.question}</h3>
                {isAnswerVisible && <p className="text-sm text-gray-600">{question.answer}</p>}
            </div>
            <div className="flex gap-2 mt-2">
                <Button 
                    onClick={handleEdit} 
                    className="bg-blue-500 text-white"
                >
                    <Edit className="h-4 w-4" />
                </Button>
                <Button 
                    onClick={handleDelete} 
                    className="bg-red-500 text-white"
                >
                    <Trash className="h-4 w-4" />
                </Button>
                <Button 
                    onClick={toggleAnswerVisibility}
                    className="bg-gray-500 text-white"
                >
                    {isAnswerVisible ? 'Hide Answer' : 'Show Answer'}
                </Button>
            </div>

            {/* Edit Question Dialog */}
            <EditQuestionDialog
                open={isEditDialogOpen}
                onOpenChange={setEditDialogOpen}
                question={{ id: question.id, text: question.question, answer: question.answer }}
                onSave={(updatedQuestion) => {
                    console.log('Updated Question:', updatedQuestion);
                    onEdit({id: updatedQuestion.id, question: updatedQuestion.text, answer: updatedQuestion.answer}); // Call the onEdit prop to handle the update
                    setEditDialogOpen(false);
                }}
            />
            {/* Alert Dialog for Delete Confirmation */}
            <AlertDialog
                open={isAlertDialogOpen}
                onOpenChange={setAlertDialogOpen}
                onConfirm={() => {
                    onDelete(question.id); // Call the onDelete prop to handle the deletion
                    setAlertDialogOpen(false);
                }}
                message={`Are you sure you want to delete the question?`}
            />
        </Card>
    );
};

export default QuestionCard; 