// Parent component is index.js
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, listCards } from "../utils/api";
import AddCardsButton from "../Layout/Buttons/AddCardsButton";

export default function Study() {

  const {deckId} = useParams(); console.log(`Study.js: deckId: ${deckId}`)

  // Variables
  const [deck, setDeck] = useState({});
  const [cardId, setCardId] = useState(1);
  const [numCards, setNumCards] = useState(null);
  const [cardContent, setCardContent] = useState(`Nobody here but us chickens`);

  // State Variables
  const [backOfCard, setBackOfCard] = useState(false);
  const [nextVis, setNextVis] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        console.log(
          `Study.js - fetchData - working prior to variable assignment`
        );
        const deck = await readDeck(deckId, abortController.signal);
        console.log(`Study.js - fetchData - deck: `, deck);
        const cards = await listCards(deckId, abortController.signal);
        const card = await readCard(cardId, abortController.signal);

        setDeck(deck);
        setCardId(card.id);
        setNumCards(cards.length);

        backOfCard ? setCardContent(card.back) : setCardContent(card.front);

      } catch (error) {
        console.log(`Error in Study.js - FetchData: `, error);
      }
      return () => abortController.abort;
    }
    fetchData();
  }, [deckId, backOfCard, cardId]);

  const handleFlipClick = () => {
    setBackOfCard(!backOfCard);
    setNextVis(true);
  };

  const handleNextClick = () => {
    if (cardId < numCards) {
      setBackOfCard(false);
      setNextVis(false);
      setCardId(cardId + 1);
    } else {
      const result = window.confirm(`Restart this deck?\n\nClick'cancel' to return to the home page.`);
      if(result) {
        setCardId(1)
        setNextVis(false)
        setBackOfCard(false)
      } else {
        history.push('/')
      }
    }
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{`${deck.name}`}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>Study: {`${deck.name}`}</h2>
      {numCards > 2 ? (<div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {`${cardId}`} of {`${numCards}`}
          </h5>
          <p className="card-text">{cardContent}</p>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => handleFlipClick()}
          >
            Flip
          </button>
          {nextVis && (
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => handleNextClick()}
            >
              Next
            </button>
          )}
        </div>
      </div>) : (
        <div>
          <h3>Not enough cards.</h3>
          <p>You need at least 3 cards to study. There are {`${numCards}`} in this deck.</p>
          <AddCardsButton deckId={deckId} />
        </div>
      )}
    </>
  );
}
