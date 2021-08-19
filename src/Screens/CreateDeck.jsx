import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { createDeck } from "../../utils/api";

export default function CreateDeck() {

    const history = useHistory();

    const [newDeckName, setNewDeckName] = useState('')
    const handleNameChange = (event) => setNewDeckName(event.target.value)
    const [newDeckDescription, setNewDeckDescription] = useState('')
    const handleDescrChange = (event) => setNewDeckDescription(event.target.value)

  const submitHandler = async (event) => {
    event.preventDefault();

    // console.log(`CreateDeck.js: submitHandler called`)

    const abortController = new AbortController();
    try {
      const newDeck = {
          name: newDeckName,
          description: newDeckDescription,
      };
      const response = await createDeck(newDeck, abortController.signal);

      // console.log(`CreateDeck - response: `, response);
      history.push(`/decks/${response.id}`)
    } catch (error) {
      console.log(`CreateDeck.js - error: `, error);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form id="new-deck-form" onSubmit={submitHandler}>
        <div className="mb-3">
          <label for="create-deck-name-input">Name</label>
          <input
            type="input"
            className="form-control"
            id="create-deck-name-input"
            placeholder="Deck Name"
            onChange={handleNameChange}
          ></input>
        </div>
        <div className="mb-3">
          <label for="create-deck-description-textarea">Description</label>
          <textarea
            id="create-deck-description-textarea"
            className="form-control"
            rows="3"
            placeholder="Brief description of the deck"
            onChange={handleDescrChange}
          ></textarea>
        </div>
        <button className="btn btn-secondary mb-3" to="/">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}
