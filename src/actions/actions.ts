"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createCategory(cat: Category) {
    // find user using clerk session
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    // create category in user's account

    try {
        const category = await prisma.category.create({
            data: {
                ...cat,
                userId
            }
        });
        revalidatePath("/categories");
        return category;
    } catch (error) {
        console.error("Error creating category:", error);
        throw new Error("Failed to create category"); // Optionally rethrow or handle the error
    }
}


// get all categories for a user
export async function getCategories() {
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