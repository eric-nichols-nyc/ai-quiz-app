'use client'
import React from 'react';
import Link from 'next/link';
import { SignOutButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button';

const StickyHeader = () => {
    const { user } = useUser()
    return (
        <header className="sticky top-0 z-10 backdrop-blur-sm bg-white/80 border-b border-purple-200 shadow-sm">
            <div className="max-w-7xl mx-auto">
                <nav className="flex justify-between items-center p-4">
                    <Link 
                        href="/" 
                        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text hover:opacity-80 transition-opacity"
                    >
                        Flashcard App
                    </Link>
                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                <Link 
                                    href="/" 
                                    className="px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all duration-200 hover:text-purple-700"
                                >
                                    Home
                                </Link>
                                <Link 
                                    href="/categories" 
                                    className="px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all duration-200 hover:text-purple-700"
                                >
                                    Categories
                                </Link>
                                <SignOutButton>
                                    <Button 
                                        variant="outline" 
                                        className="bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 border-purple-200 font-medium"
                                    >
                                        Sign Out
                                    </Button>
                                </SignOutButton>
                            </>
                        ) : (
                            <Link href="/sign-in">
                                <Button 
                                    variant="outline" 
                                    className="bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 border-purple-200 font-medium"
                                >
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default StickyHeader; 