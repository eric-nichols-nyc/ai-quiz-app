import React from 'react';
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Category } from '@prisma/client';
import { Button } from '@/components/ui/button';

type CatCardProps = {
    category: Category;
}
export function CatCard({ category }: CatCardProps) {

  return (
    <Card className="w-full p-4 transition-transform transform hover:shadow-lg rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <div className="flex justify-between items-center w-full">
            <Link href={`/categories/${category.name}`} className="text-lg font-semibold hover:underline">{category.name}</Link>
            <div className="flex gap-2 mt-2">
                <Link href={`/categories/${category.id}/practice`}>
                    <Button className="bg-white text-blue-500 rounded px-4 py-2 hover:bg-gray-200 transition">Practice</Button>
                </Link>
                <Link href={`/categories/${category.id}/manage`}>
                    <Button className="bg-white text-green-500 rounded px-4 py-2 hover:bg-gray-200 transition">Manage</Button>
                </Link>
            </div>
        </div>
    </Card>
  )
}
