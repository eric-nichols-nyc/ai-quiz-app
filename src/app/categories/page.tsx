import React from 'react';
import CategoryList from '@/components/CategoryList';

const CategoriesPage = () => {
    return (
        <div className="w-full">
            <h1>Your Categories</h1>
            <CategoryList />
        </div>
    );
};

export default CategoriesPage; 