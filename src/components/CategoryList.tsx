"use client"
import React, { useState } from 'react';
import { CatCard } from './CatCard';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Category } from '@prisma/client';
import { createCategory } from '@/actions/actions'; // Import your createCategory function
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CategoryList = () => {
    const queryClient = useQueryClient();
    const { data: categories, isLoading, error } = useQuery<Category[]>({
        queryKey: ['categories'],
        staleTime: Infinity // Optionally prevent refetching
    });

    const [newCategoryName, setNewCategoryName] = useState({name: ''});
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

    const mutation = useMutation<Category, Error, string>({
        mutationFn: createCategory,
        onMutate: async(newCategory) => {
            console.log("Mutating category:", newCategory);
            queryClient.invalidateQueries({queryKey: ['categories']}); 
            // cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({queryKey: ['categories']});
            // Snapshot the previous value
            const previousCategories = queryClient.getQueryData<Category[]>(['categories']);
            console.log("Previous categories:", previousCategories);
            // optimistically update to the new value
            queryClient.setQueryData(['categories'], [...previousCategories || [], {name: newCategory, id: 'new'}]);
            // return a context object with the snapshot value
            return { previousCategories };
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['categories']}); // Refetch categories after adding
            setNewCategoryName({name: ''}); // Reset input
            setIsDialogOpen(false);
        },
        onError: (error, newCategory, context) => {
            console.error("Error creating category:", error);
            const ctx = context as { previousCategories?: Category[] };
            queryClient.setQueryData(['categories'], ctx.previousCategories)
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(newCategoryName.name); // Adjust according to your createCategory function
    };

    return (
        <div className="flex flex-col gap-4 p-4 items-center">
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {categories?.map((category) => (
                <CatCard key={category.id} category={category} />
            ))}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}> {/* Control dialog open state */}
            <DialogTrigger asChild>
                    <Button 
                        variant="outline" 
                        className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white"
                    >
                        <span className="text-3xl">+</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>
                            Enter the name of the new category below.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category-name" className="text-right">
                                Category Name
                            </Label>
                            <Input
                                id="category-name"
                                value={newCategoryName.name}
                                onChange={(e) => setNewCategoryName({name: e.target.value})}
                                placeholder="Category Name"
                                required
                                className="col-span-3"
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CategoryList; 