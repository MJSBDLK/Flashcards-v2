import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';

export default function EditCard() {
  const { deckId, cardId } = useParams(); // console.log(`EditCard.js - deckId: ${deckId}; cardId: ${cardId}`)
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        const responseDeck = await readDeck(deckId, abortController.signal); // console.log(`EditCard.js - readDeck executed successfully`, responseDeck);
        const responseCard = await readCard(cardId, abortController.signal); // console.log(`EditCard.js - readCard executed successfully`, responseCard);
        setDeck(responseDeck);
        setCard(responseCard);
      } catch (error) {
        console.log(`EditCard.js - error: `, error.message);
      }
      return () => abortController.abort;
    }
    fetchData();
  }, [cardId, deckId]);

  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);
  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const submitHandler = async (event) => {
      event.preventDefault();

      const abortController = new AbortController();
      try {
          const newCard = {
              front: front,
              back: back,
              deckId: deckId,
              id: card.id,
          }
          
      const response = await updateCard(newCard, abortController.signal);
      // console.log(`updateCard executed successfully.`, response);
      history.push(`/decks/${deckId}`)
      } catch (error) {console.log(`EditCard submitHandler error: `, error.message)}
  }

  return (
    <>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to={`/decks/${deck.id}`}>{`${deck.name}`}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <form id='edit-card-form' onSubmit={submitHandler}>
        <div className='mb-3'>
          <label for='edit-card-front-input'>Front</label>
          <textarea
            className='form-control'
            id='edit-card-front-input'
            placeholder={card.front}
            onChange={handleFrontChange}
          ></textarea>
        </div>
        <div className='mb-3'>
          <label for='edit-card-back-input'>Back</label>
          <textarea
            id='edit-card-back-input'
            className='form-control'
            rows='3'
            placeholder={card.back}
            onChange={handleBackChange}
          ></textarea>
        </div>
        <Link className='btn btn-secondary m-1' to={`/decks/${deck.id}`}>
          Cancel
        </Link>
        <button type='submit' className='btn btn-primary m-1'>
          Submit
        </button>
      </form>
    </>
  );
}
