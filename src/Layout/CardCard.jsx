import EditButton from "./Buttons/EditButton";
import React, { useState, useEffect } from "react";
import { readCard } from "../utils/api";
import DeleteButton from "./Buttons/DeleteButton";

export default function CardCard({ card }) {

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-column p-1">{card.front}</div>
          <div className="d-flex flex-column p-1">
            <div className="align-self-end m-1">{card.back}</div>
            <div className="align-self-end m-1">
              <EditButton url={`/decks/${card.deckId}/cards/${card.id}/edit`} />
              <DeleteButton type={"card"} id={card.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
