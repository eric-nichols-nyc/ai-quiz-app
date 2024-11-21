import { Category, Card } from '@prisma/client'; // {{ edit_1 }}

export const sampleCategories: Category[] = [ // {{ edit_2 }}
    {
        id: '1', // Ensure this matches your schema's ID type
        name: 'React',
        index: 0,
        cardCount: 2,
        userId: 'user1', // Replace with a valid user ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        name: 'Next Js',
        index: 1,
        cardCount: 2,
        userId: 'user1', // Replace with a valid user ID
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export const sampleCards: Card[] = [ // {{ edit_3 }}
    {
        id: '1', // Ensure this matches your schema's ID type
        question: 'What is React?',
        answer: 'React.js is a JavaScript library developed by Facebook for building fast and interactive user interfaces, primarily used for single-page applications by breaking the UI into reusable components.',
        tags: [],
        difficulty: 'easy',
        categoryId: '1', // Reference to the category ID
        userId: 'user1', // Replace with a valid user ID
        audioUrls: null,
        stats: {},
        history: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2', // Ensure this matches your schema's ID type
        question: 'What is JSX?',
        answer: 'JSX is a syntax extension for JavaScript that looks like HTML and is used in React to describe the structure of the user interface by allowing HTML and JavaScript to be written together.',
        tags: [],
        difficulty: 'easy',
        categoryId: '1', // Reference to the category ID
        userId: 'user1', // Replace with a valid user ID
        audioUrls: null,
        stats: {},
        history: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        question: 'Who was the first President of the United States?',
        answer: 'George Washington',
        tags: [],
        difficulty: 'medium',
        categoryId: '2', // Reference to the category ID
        userId: 'user1', // Replace with a valid user ID
        audioUrls: null,
        stats: {},
        history: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export const sampleItems = [
    { id: '1', question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { id: '2', question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks similar to XML.' },
    // Add more questions as needed
];