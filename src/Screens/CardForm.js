import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard, createCard } from "../utils/api";

export default function Edit({ edit }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({
    front: "Front side of card",
    back: "Back side of card",
    deckId: Number(deckId),
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        const responseDeck = await readDeck(deckId, abortController.signal);
        setDeck(responseDeck);
        if (edit) {
          const responseCard = await readCard(cardId, abortController.signal);
          setCard(responseCard);
        }
      } catch (error) {
        console.log(`AddOrEditCard - error: `, error.message);
      }
      return () => abortController.abortController;
    }
    fetchData();
  }, [cardId, edit, deckId]);

  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const submitHandler = async (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    try {
      if (edit) {
        const newCard = {
          front: front,
          back: back,
          deckId: deckId,
          id: card.id,
        };
        const response = await updateCard(newCard, abortController.signal);
        console.log(`updateCard executed successfully.`, response);
        history.push(`/decks/${deckId}`);
      } else {
        const newCard = {
          front: front,
          back: back,
        };
        const response = await createCard(
          deckId,
          newCard,
          abortController.signal
        );
        console.log(`CreateCard executed successfully.`, response);
        history.go(0);
      }
    } catch (error) {
      console.log(`CardForm submitHandler error: `, error);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{`${deck.name}`}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {edit ? `Edit Card ${card.id}` : `Add Card`}
          </li>
        </ol>
      </nav>
      <h2>{edit ? `Edit Card` : `${deck.name}: Add Card`}</h2>
      <form id="edit-card-form" onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="edit-card-front-input">Front</label>
          <textarea
            className="form-control"
            id="edit-card-front-input"
            defaultValue={card.front}
            onChange={handleFrontChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="edit-card-back-input">Back</label>
          <textarea
            id="edit-card-back-input"
            className="form-control"
            rows="3"
            defaultValue={card.back}
            onChange={handleBackChange}
          ></textarea>
        </div>
        <Link className="btn btn-secondary m-1" to={`/decks/${deck.id}`}>
          {edit ? `Cancel` : `Done`}
        </Link>
        <button type="submit" className="btn btn-primary m-1">
          Submit
        </button>
      </form>
    </div>
  );
}
