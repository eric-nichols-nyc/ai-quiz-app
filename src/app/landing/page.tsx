import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
    return (
        <div>
            <h1>Welcome to the Flashcard App</h1>
            <Link href="/categories">
                <Button>View Categories</Button>
            </Link>
        </div>
    );
};

export default LandingPage; 