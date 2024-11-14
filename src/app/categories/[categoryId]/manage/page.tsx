import React from "react";
import { sampleCards } from "@/data/sampleData";
import FlashcardGallery from "@/components/FlashcardGallery";
const ManagePage = ({params}: {params: {categoryId: string}}) => {

  // return the cards for the category
  const cards = sampleCards.filter((card) => card.categoryId === params.categoryId);
  return (
    <div className="container">
      <div>manage page</div>
      <FlashcardGallery flashcards={cards} />
    </div>
  );
};

export default ManagePage;
