"use client"
import React from 'react';
import { CatCard } from './CatCard';
import { useQuery } from '@tanstack/react-query';
import { Category } from '@prisma/client';

const CategoryList = () => {
    // get categories from query
    const {data:categories, isLoading,error} = useQuery<Category[]>({
        queryKey:['categories'],
        staleTime: Infinity // Optionally prevent refetching
    })
    return (
        <div className="flex flex-col gap-4 p-4">
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {categories?.map((category) => (
                <CatCard key={category.id} category={category} />
            ))}
        </div>
    );
};

export default CategoryList; 