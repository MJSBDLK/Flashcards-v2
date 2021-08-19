import ViewButton from "./Buttons/ViewButton";
import StudyButton from "./Buttons/StudyButton";
import DeleteButton from "./Buttons/DeleteButton";
import React, { useEffect, useState } from "react";
import { readDeck, listCards } from "../utils/api/index";

export default function DeckCard({ deckId }) {
  const [deck, setDeck] = useState({});
  const [numCards, setNumCards] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      //console.log(`DeckCard - abortController: `, abortController);
      try {
        const deck = await readDeck(deckId, abortController.signal); // console.log(`DeckCard.js: deck = `, deck);
        const cards = await listCards(deckId, abortController.signal); // console.log(`DeckCard.js: cards = `, cards);

        setDeck(deck);
        setNumCards(cards.length);
      } catch (error) {
        console.log(`Error in DeckCard.js - FetchData: `, error);
      }
    }
    fetchData();
    // useEffect only ever invokes this function if the component is un-loaded
    return () => {
      // console.log(`DeckCard component was unloaded.`);
      return abortController.abort();
    };
  }, [deckId]);

  // console.log(`Decklist.js - deck = `, deck)

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{`${deck.name}`}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{`${numCards} cards`}</h6>
        </div>
        <p className="card-text">{deck.description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <ViewButton deckId={deckId} />
            <StudyButton deckId={deckId} />
          </div>
          <DeleteButton type={"deck"} id={deckId} />
        </div>
      </div>
    </div>
  );
}
