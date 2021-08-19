import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listCards, readDeck } from "../utils/api";
import { Link } from "react-router-dom";
import AddCardsButton from "../Layout/Buttons/AddCardsButton";

export default function Study() {
  const { deckId } = useParams(); // console.log(`DeckId: `, deckId)
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [cardNumber, setCardNumber] = useState(0);
  const [back, setBack] = useState(false);
  const [nextVis, setNextVis] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeck() {
      try {
        const responseDeck = await readDeck(deckId, abortController.signal);
        const responseCards = await listCards(deckId, abortController.signal);
        setDeck(responseDeck);
        setCards(responseCards); // console.log(`Cards received: `, cards)
      } catch (error) {
        console.log(`Error in Study.js: `, error.message);
      }
      return () => abortController.abort;
    }
    fetchDeck();
  }, [deckId]);

  const handleFlip = () => {
    setBack(!back);
    setNextVis(true);
  };

  const handleNext = () => {
    if (cardNumber < cards.length - 1) {
      setBack(false);
      setNextVis(false);
      setCardNumber(cardNumber + 1);
    } else {
      const result = window.confirm(
        `Restart this deck?\n\nClick'cancel' to return to the home page.`
      );
      if (result) {
        setCardNumber(0);
        setNextVis(false);
        setBack(false);
      } else {
        history.push("/");
      }
    }
  };

  // console.log(`cards[cardNumber]: `, cards[cardNumber]);

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
      {cards.length > 2 ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {`${cardNumber + 1}`} of {cards.length}
            </h5>
            {back ? (
              <p className="card-text">{cards[cardNumber].back}</p>
            ) : (
              <p className="card-text">{cards[cardNumber].front}</p>
            )}
            <button
              type="button"
              class="btn btn-secondary m-1"
              onClick={() => handleFlip()}
            >
              Flip
            </button>
            {nextVis && (
              <button
                type="button"
                class="btn btn-primary m-1"
                onClick={() => handleNext()}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3>Not enough cards.</h3>
          <p>
            You need at least 3 cards to study. There are {`${cards.length}`}
            cards in this deck.
          </p>
          <AddCardsButton deckId={deckId} />
        </div>
      )}
    </>
  );
}
