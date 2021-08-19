import { useParams } from "react-router";
import { readDeck } from "../../utils/api";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import EditButton from "../Buttons/EditButton";
import StudyButton from "../Buttons/StudyButton";
import AddCardsButton from "../Buttons/AddCardsButton";
import DeleteButton from "../Buttons/DeleteButton";
import CardList from "../CardList";

export default function Deck() {
  const [deck, setDeck] = useState({});

  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeck() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.log(`Deck.js - error`, error);
      }
    }
    fetchDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  // console.log(`Deck.js - deck: `, deck)

  return (
    <div>
      <div className="mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {`${deck.name}`}
            </li>
          </ol>
        </nav>
        <h4>{deck.name}</h4>
        <h5 className='mb-2'>{deck.description}</h5>
        <div className="d-flex justify-content-between">
          <div>
            <EditButton url={`/decks/${deckId}/edit`} />
            <StudyButton deckId={deckId} />
            <AddCardsButton deckId={deckId} />
          </div>
          <div>
            <DeleteButton type={`deck`} id={deckId} />
          </div>
        </div>
      </div>
      <h3>Cards</h3>
      <CardList type={`card`} deckId={deckId} />
    </div>
  );
}
