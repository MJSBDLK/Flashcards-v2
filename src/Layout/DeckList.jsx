import React, { useEffect, useState } from "react";
import DeckCard from "./DeckCard";
import { listDecks } from "../utils/api";

export default function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
          const allDecks = await listDecks(abortController.signal);
          setDecks(allDecks)
      } catch (error) {
        console.log(`Error in DeckList.js - FetchData: `, error);
      }
      return () => abortController.abort;
    }
    fetchData();
  }, []);

  return (
      <div>
        {decks.map((deck) => <DeckCard key={deck.id} deckId={deck.id} />)}
      </div>
  );
}