import React from 'react'

import { Card } from '@prisma/client';

type GalleryProps = {
    cards: Card[];
}
const Gallery = ({cards}: GalleryProps) => {
  return (
    <div className="container">
    <h1>Manage Category</h1>
    {/* List of flashcards with update/delete options */}
    {cards.map((card) => (
      <pre key={card.id}>{JSON.stringify(card, null, 2)}</pre>
    ))}
  </div>
  )
}

export default Gallery