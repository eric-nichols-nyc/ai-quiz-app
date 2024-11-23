'use client'
import React, { useState } from 'react';
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Category } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';

type CatCardProps = {
    category: Category;
    onDelete: () => void;
}
export function CatCard({ category, onDelete }: CatCardProps) {
    const [isDialogOpen, setDialogOpen] = useState(false);

    return (
        <Card className="w-full p-4 transition-transform hover:scale-[1.02] hover:shadow-lg rounded-lg bg-white border border-purple-200">
            <div className="flex justify-between items-center w-full">
                <Link 
                    href={`/categories/${category.name}`} 
                    className="text-lg font-semibold text-gray-800 hover:text-purple-600"
                >
                    {category.name}
                </Link>
                <div className="flex gap-2">
                    <Link href={`/categories/${category.id}/practice`}>
                        <Button 
                            variant="outline"
                            className="bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-gray-700 border-purple-200"
                        >
                            Practice
                        </Button>
                    </Link>
                    <Link href={`/categories/${category.id}/manage`}>
                        <Button 
                            variant="outline"
                            className="bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-gray-700 border-purple-200"
                        >
                            Manage
                        </Button>
                    </Link>
                    <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button 
                                variant="outline"
                                className="bg-white hover:bg-red-50 text-red-600 border-red-200 hover:border-red-300"
                            >
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                All questions in this category will be permanently deleted. This action cannot be undone.
                            </AlertDialogDescription>
                            <div className="flex justify-end gap-2">
                                <AlertDialogCancel 
                                    onClick={() => setDialogOpen(false)}
                                    className="bg-white hover:bg-gray-100"
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                    onClick={onDelete} 
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                    Delete
                                </AlertDialogAction>
                            </div>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </Card>
    )
}
