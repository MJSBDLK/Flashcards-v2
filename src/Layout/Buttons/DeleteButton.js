import { deleteCard, deleteDeck } from "../../utils/api/index";
import { useHistory } from "react-router";

export default function DeleteButton({ type, id }) {
  const history = useHistory();

  const handleDelete = async () => {
    const abortController = new AbortController();

    const result = window.confirm(
      `Delete this ${type}?\n\nYou will not be able to recover it.`
    );

    if (result) {
      if (type === `deck`) {
        await deleteDeck(id, abortController.signal);
      } else if (type === `card`) {
        await deleteCard(id, abortController.signal);
      }
      history.go("0");
    }
  };

  return (
    <button
      type="button"
      className="btn btn-danger deleteButton m-1"
      onClick={handleDelete}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash-fill mb-1"
        viewBox="0 0 16 16"
      >
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
      </svg>
    </button>
  );
}
