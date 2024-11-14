import FlashcardGallery from "@/components/FlashcardGallery";
import React from "react";
import { sampleCards, sampleCategories } from "@/data/sampleData";

const PracticePage = ({params}: {params: {categoryId: string}}) => {
  const title = sampleCategories.find((category) => category.id === params.categoryId)?.name;
  const cards = sampleCards.filter((card) => card.categoryId === params.categoryId);

  return (
    <div className="container max-w-3xl border rounded-lg p-4">
      <h1>{title}</h1>
      <FlashcardGallery flashcards={cards} />
    </div>
  );
};

export default PracticePage;
