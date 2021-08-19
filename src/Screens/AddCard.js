import { readDeck, createCard } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function AddCard() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  const history = useHistory();

  useEffect(() => {
    async function fetchDeck() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.log(`AddCard.js - error: `, error);
      }
      return () => abortController.abort;
    }
    fetchDeck();
  }, []);

  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const submitHandler = async (event) => {
      event.preventDefault();
      const abortController = new AbortController();
      
      try {
          const newCard = {
              front: front,
              back: back,
          }
          const response = await createCard(deckId, newCard, abortController.signal)
          // console.log(`CreateCard executed successfully.`, response)
          history.go(0)

      } catch (error) {console.log(`AddCard.js - submitHandler - error: `, error.message)}
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{`${deck.name}`}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <form id="add-card-form" onSubmit={submitHandler}>
        <div className="mb-3">
          <label for="add-card-front-input">Front</label>
          <textarea
            className="form-control"
            id="add-card-front-input"
            placeholder="Front side of card"
            onChange={handleFrontChange}
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3">
          <label for="add-card-back-input">Front</label>
          <textarea
            className="form-control"
            id="add-card-back-input"
            placeholder="Back side of card"
            onChange={handleBackChange}
            rows="3"
          ></textarea>
        </div>
        <Link className="btn btn-secondary m-1" to={`/decks/${deck.id}`}>
          Done
        </Link>
        <button type="submit" className="btn btn-primary m-1">
          Submit
        </button>
      </form>
    </>
  );
}
