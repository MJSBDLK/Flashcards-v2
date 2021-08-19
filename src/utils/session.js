export default function session({
    decks,
    setDecks,
}) {
    const sessionVars = {
        decks: decks,
        setDecks: setDecks,
    };
    return sessionVars;
}