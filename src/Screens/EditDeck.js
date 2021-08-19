import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

export default function EditDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState({});

  const { deckId } = useParams();

  useEffect(() => {
    async function fetchDeck() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.log(`EditDeck.js - error: `, error);
      }
      return () => abortController.abort;
    }
    fetchDeck();
  }, [deckId]);

  const [newDeckName, setNewDeckName] = useState(deck.name);
  const [newDeckDescription, setNewDeckDescription] = useState(
    deck.description
  );
  const handleNameChange = (event) => setNewDeckName(event.target.value);
  const handleDescrChange = (event) =>
    setNewDeckDescription(event.target.value);

  const submitHandler = async (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    try {
      const newDeck = {
        id: deck.id,
        name: newDeckName,
        description: newDeckDescription,
      };
      // console.log(`EditDeck.js - newDeck: `, newDeck);

      const response = await updateDeck(newDeck, abortController.signal);

      // console.log(`EditDeck - response: `, response);
      history.push(`/decks/${response.id}`);
    } catch (error) {
      console.log(`EditDeck.js - error: `, error);
    }
  };

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
      <h2>Edit Deck</h2>
      <form id="edit-deck-form" onSubmit={submitHandler}>
        <div className="mb-3">
          <label for="edit-deck-name-input">Name</label>
          <input
            type="input"
            className="form-control"
            id="edit-deck-name-input"
            placeholder={deck.name}
            onChange={handleNameChange}
          ></input>
        </div>
        <div className="mb-3">
          <label for="edit-deck-description-area">Description</label>
          <textarea
            id="edit-deck-description-textarea"
            className="form-control"
            rows="3"
            placeholder={deck.description}
            onChange={handleDescrChange}
          ></textarea>
        </div>
        <Link className="btn btn-secondary m-1" to={`/decks/${deck.id}`}>
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary m-1">
          Submit
        </button>
      </form>
    </>
  );
}
