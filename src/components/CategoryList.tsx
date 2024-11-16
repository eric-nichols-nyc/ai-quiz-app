import React from 'react';
import { CatCard } from './CatCard';
import { Category } from '@prisma/client';

type CategoryListProps = {
    categories: Category[] | null;
}
const CategoryList = ({ categories }: CategoryListProps) => {
    return (
        <div className="flex flex-col gap-4 p-4">
            {categories?.map((category) => (
                <CatCard key={category.id} category={category} />
            ))}
        </div>
    );
};

export default CategoryList; 