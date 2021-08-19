import { Link } from 'react-router-dom';

export default function NewDeckButton({deckId}) {
  return (
    <Link type="button" className="btn btn-secondary newDeckButton m-1" to="/decks/new">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-plus-lg mr-2 mb-1"
        viewBox="0 0 16 16"
      >
        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
      </svg>
      New Deck
    </Link>
  );
}
