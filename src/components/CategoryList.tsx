import React from 'react';
import { CatCard } from './CatCard';
import { sampleCategories } from '../data/sampleData';

const CategoryList = () => {
    return (
        <div className="flex flex-col gap-4 p-4">
            {sampleCategories.map((category) => (
                <CatCard key={category.id} category={category} />
            ))}
        </div>
    );
};

export default CategoryList; 