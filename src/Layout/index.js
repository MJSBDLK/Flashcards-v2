// Import
import React from "react";
import {Switch, Route} from 'react-router-dom';
// Import Layout Components
import Header from "./Header";
import NotFound from "./NotFound";
// Import Screens
import Home from "../Screens/Home";
import Study from "../Screens/Study";
import CreateDeck from "../Screens/CreateDeck";
import Deck from "../Screens/Deck";
import EditDeck from "../Screens/EditDeck";
import CardForm from "../Screens/CardForm";

function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/decks/:deckId/study"><Study /></Route>
          <Route exact path="/decks/new"><CreateDeck /></Route>
          <Route exact path="/decks/:deckId"><Deck /></Route>
          <Route exact path="/decks/:deckId/edit"><EditDeck /></Route>
          <Route exact path="/decks/:deckId/cards/new"><CardForm edit={false} /></Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit"><CardForm edit={true} /></Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
