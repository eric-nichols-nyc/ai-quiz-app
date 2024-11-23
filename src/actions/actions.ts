"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Card, Category } from "@prisma/client";

export async function createCategory(name: string): Promise<Category> {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

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
        throw new Error("Failed to create category");
    }
}

export async function deleteCategory(id: string): Promise<void> {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        console.log("Deleting category and its cards:", id, userId);
        
        // Use a transaction to ensure both operations succeed or fail together
        await prisma.$transaction(async (tx) => {
            // Delete all cards in the category first
            await tx.card.deleteMany({
                where: { categoryId: id }
            });

            // Then delete the category
            await tx.category.delete({
                where: { id }
            });
        });
    } catch (error) {
        console.error("Error deleting category and cards:", error);
        throw new Error("Failed to delete category and its cards");
    }
}


// get all categories for a user
export async function getCategories(): Promise<Category[]> {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        const categories = await prisma.category.findMany({
            where: {
                userId
            }
        });
        console.log("Categories fetched:", categories);
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories"); // Optionally rethrow or handle the error
    }
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


// get the category name
export async function getCategoryName(id: string): Promise<string | null> {
    const category = await prisma.category.findUnique({
        where: { id }
    });
    return category?.name || null;
}

// add a question to a category
export async function addQuestionToCategory(categoryId: string, question: string, answer: string): Promise<Card> {
    const userId  = await getUserId();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const card = await prisma.card.create({
        data: { question, answer, categoryId, userId, difficulty: "easy", stats: { create: {} } }
    });
    return card;
}

// delete a question from a category
export async function deleteQuestionFromCategory(id: string): Promise<void> {
    await prisma.card.delete({
        where: { id }
    });
}

// update a question
export async function updateQuestion(id: string, question: string, answer: string): Promise<void> {
    console.log("Updating question action:", id, question, answer);
    await prisma.card.update({
        where: { id },
        data: { question, answer }
    });
}

// return the user id
export async function getUserId(): Promise<string | null> {
    const { userId } = auth();
    return userId || null;
}