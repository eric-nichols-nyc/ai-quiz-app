import FlashcardGallery from "@/components/FlashcardGallery";
import React from "react";
import { sampleCards, sampleCategories } from "@/data/sampleData";
import { QueryClient } from "@tanstack/react-query";
import { getCardsByCategoryId, getCategoryName } from "@/actions/actions";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// prefetch the category and cards with tanstack query and categoryId
// Create dynamic breadcrumbs using the category name

const PracticePage = async ({ params }: { params: { categoryId: string } }) => {
  const queryClient = new QueryClient();

  // Prefetch and immediately get the data
  await queryClient.prefetchQuery({
    queryKey: ["categoryName", params.categoryId],
    queryFn: () => getCategoryName(params.categoryId),
  });
  const categoryName = await getCategoryName(params.categoryId);

  await queryClient.prefetchQuery({
    queryKey: ["cards", params.categoryId],
    queryFn: () => getCardsByCategoryId(params.categoryId),
  });
  const cards = await getCardsByCategoryId(params.categoryId);

  console.log("cards", cards);

  // if there are no cards, redirect to the create page

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "Practice" }, // Current page, no href
  ];

  if (cards.length === 0) {
    return (
      <div className="container max-w-3xl p-4 ">
        <Breadcrumbs items={breadcrumbItems} />
      <div className="flex w-full items-center justify-center font-semibold text-2xl mb-4 ">
        <h1>{categoryName}</h1>
      </div>
        <div className="flex w-full items-center justify-center font-semibold text-2xl mb-4 ">
          There are no cards in this category. Please create some cards.
        </div>
        <Button>
          <Link href={`/categories/${params.categoryId}/manage`}>Create Cards</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl p-4 ">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex w-full items-center justify-center font-semibold text-2xl mb-4 ">
        <h1>{categoryName}</h1>
      </div>
      <FlashcardGallery flashcards={cards} />
    </div>
  );
};

export default PracticePage;
