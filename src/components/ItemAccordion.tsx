import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

type ItemAccordionProps = {
    items: { id: string; name: string; description: string }[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
};

const ItemAccordion: React.FC<ItemAccordionProps> = ({ items, onEdit, onDelete }) => {
    return (
        <Accordion type="single" collapsible className="w-96">
            {items.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="flex justify-between items-center">
                        <span>{item.name}</span>
                        <div className="flex gap-2">
                            <Button 
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent accordion toggle
                                    onEdit(item.id);
                                }} 
                                className="bg-blue-500 text-white"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent accordion toggle
                                    onDelete(item.id);
                                }} 
                                className="bg-red-500 text-white"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>{item.description}</p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default ItemAccordion; 