import React from 'react';

const CategoryList = () => {
    const categories = ['Math', 'Science', 'History']; // Example categories

    return (
        <ul>
            {categories.map((category, index) => (
                <li key={index}>
                    <a href={`/categories/${category}`}>{category}</a>
                </li>
            ))}
        </ul>
    );
};

export default CategoryList; 