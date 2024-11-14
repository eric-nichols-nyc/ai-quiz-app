import React from 'react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Category } from '@prisma/client';
import { Button } from '@/components/ui/button';

type CatCardProps = {
    category: Category;
}
export function CatCard({ category }: CatCardProps) {
  return (
    <Card className="w-full">
        <li className="flex justify-between items-center w-full">
            <Link href={`/categories/${category.name}`} className="text-lg font-semibold">{category.name}</Link>
            <div className="flex gap-2 mt-2">
                <Link href={`/categories/${category.id}/practice`}>
                    <Button className="bg-blue-500 text-white rounded px-4 py-2">Practice</Button>
                </Link>
                <Link href={`/categories/${category.id}/manage`}>
                    <Button className="bg-green-500 text-white rounded px-4 py-2">Manage</Button>
                </Link>
            </div>
        </li>
    </Card>
  )
}