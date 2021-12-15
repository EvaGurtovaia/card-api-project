import React, { Component } from "react";
import axios from "axios";
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
        return (
            <div>
                <h1>Card Dealer</h1>
                <button onClick={this.getCard}>Get card!</button>
            </div>
        );
    }
}

export default Deck;
