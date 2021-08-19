import React from "react";
import NewDeckButton from "../Buttons/NewDeckButton";
import DeckList from "../DeckList";

export default function Home() {
  return (
    <div>
      <NewDeckButton />
      <DeckList />
    </div>
  );
}
