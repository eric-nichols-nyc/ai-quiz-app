"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Card, Category } from "@prisma/client";

export async function createCategory(name: string): Promise<Category> {
    // find user using clerk session
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    // create category in user's account

    try {
        console.log("Creating category:", name, userId);
        const category = await prisma.category.create({
            data: {
                name,
                userId
            }
        });
        return category;
    } catch (error) {
        console.error("Error creating category:", error);
        throw new Error("Failed to create category"); // Optionally rethrow or handle the error
    }
}


// get all categories for a user
export async function getCategories():Promise<Category[]> {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    const categories = await prisma.category.findMany({
        where: {
            userId
        }
    });
    return categories;
}

// get a category by id
export async function getCategoryById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
        where: { id }
    });
    return category;
}


// get an array of cards by category id
export async function getCardsByCategoryId(id: string): Promise<Card[]> {
    const cards = await prisma.card.findMany({
        where: { categoryId: id }
    });
    return cards;
}

export async function deleteCategory(id: string): Promise<void> {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        console.log("Deleting category:", id, userId);
        await prisma.category.delete({
            where: { id }
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        throw new Error("Failed to delete category");
    }
}