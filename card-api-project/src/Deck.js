import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";
const baseApiUrl = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = { deck: null, drawn: [] };
        this.getCard = this.getCard.bind(this);
    }

    async componentDidMount() {
        let deck = await axios.get(`${baseApiUrl}/new/shuffle`);
        this.setState({ deck: deck.data });
    }
    async getCard() {
        let deck_id = this.state.deck.deck_id;
        try {
            let cardUrl = `${baseApiUrl}/${deck_id}/draw/`;
            let cardRes = await axios.get(cardUrl);
            if (!cardRes.data.success) {
                throw new Error("No card remaining!");
            }
            let card = cardRes.data.cards[0];
            console.log(cardRes.data);
            this.setState((st) => ({
                drawn: [
                    ...st.drawn,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`,
                    },
                ],
            }));
        } catch (err) {
            alert(err);
        }
    }
    render() {
        let cards = this.state.drawn.map((card) => (
            <Card name={card.name} image={card.image} key={card.id} />
        ));
        return (
            <div>
                <h1 className="Deck-title">Card Dealer</h1>
                <h2 className="Deck-title subtitle">
                    A little demo made with React
                </h2>
                <button onClick={this.getCard}>Get card!</button>
                <div className="CardArea">{cards}</div>
            </div>
        );
    }
}

export default Deck;
