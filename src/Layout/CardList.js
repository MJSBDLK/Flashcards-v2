import { useEffect, useState } from "react";
import CardCard from "./CardCard";
import DeckCard from './DeckCard'
import { listDecks, listCards } from "../utils/api";

export default function CardList({type, deckId}) {

    const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
          if(type.includes(`card`)) {
              const cardList = await listCards(deckId, abortController.signal)
              setCards(cardList);
          } else if (type.includes(`deck`)) {
              const deckList = await listDecks(abortController.signal)
              setCards(deckList);
          }
      } catch (error) {
        console.log(`Error in DeckList.js - FetchData: `, error);
      }
      return () => abortController.abort;
    }
    fetchData();
  }, [type, deckId]);

  return (
      <>
        {type.includes(`deck`) && cards.map((deck) => <DeckCard deckId={deck.id} />)}
        {type.includes(`card`) && cards.map((card) => <CardCard cardId={card.id} />)}
      </>
  );
}