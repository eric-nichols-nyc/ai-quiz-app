import React from 'react';
import Link from 'next/link';

const StickyHeader = () => {
    return (
        <header className="sticky top-0 bg-white shadow-md z-10 p-4">
            <nav className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Flashcard App</h1>
                <div>
                    <Link href="/" className="mr-4">Home</Link>
                    <Link href="/categories" className="mr-4">Categories</Link>
                    <Link href="/sign-in">Sign In</Link>
                </div>
            </nav>
        </header>
    );
};

export default StickyHeader; 