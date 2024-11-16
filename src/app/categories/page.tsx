import React from 'react';
import CategoryList from '@/components/CategoryList';
import { auth } from '@clerk/nextjs/server';
import { getCategories } from '@/actions/actions';
const fetchCategories = async () => {
    const { userId } = auth(); // Get user ID using Clerk auth
    if (!userId) {
        console.error("Unauthorized");
        return;
    }

    try {
        const categories = await getCategories(); // Call the getCategories action
        console.log("User's categories:", userId, categories);
        return categories; // Log the categories
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

const CategoriesPage = async() => {
    const categories = await fetchCategories();
    console.log('categories ', categories);
 

    return (
        <div className="w-full">
            <h1>Your Categories</h1>
            {
                categories ? <CategoryList categories={categories} /> : <div>No categories found</div>
            }
        </div>
    );
};

export default CategoriesPage; 