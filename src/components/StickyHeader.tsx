'use client'
import React from 'react';
import Link from 'next/link';
import { SignOutButton, useUser } from '@clerk/nextjs'

const StickyHeader = () => {
    const { user } = useUser()
    return (
        <header className="sticky top-0 bg-white shadow-md z-10 p-4">
            <nav className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Flashcard App</h1>
                <div>
                    {user ? (
                        <>
                            <Link href="/" className="mr-4">Home</Link>
                            <Link href="/categories" className="mr-4">Categories</Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <Link href="/sign-in">Sign In</Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default StickyHeader; 