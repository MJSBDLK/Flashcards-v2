import ViewButton from "./Buttons/ViewButton";
import StudyButton from "./Buttons/StudyButton";
import DeleteButton from "./Buttons/DeleteButton";
import React from "react";

export default function DeckCard({ deck }) {

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{`${deck.name}`}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{`${deck.cards.length} cards`}</h6>
        </div>
        <p className="card-text">{deck.description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <ViewButton deckId={deck.id} />
            <StudyButton deckId={deck.id} />
          </div>
          <DeleteButton type={"deck"} id={deck.id} />
        </div>
      </div>
    </div>
  );
}
