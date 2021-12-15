import React, { Component } from "react";
import axios from "axios";
const baseApiUrl = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = { deck: null };
        this.getCard = this.getCard.bind(this);
    }

    async componentDidMount() {
        let deck = await axios.get(`${baseApiUrl}/new/shuffle`);
        this.setState({ deck: deck.data });
    }
    async getCard() {
        let id = this.state.deck.deck_id;
        let cardUrl = `${baseApiUrl}/${id}/draw/`;
        let cardRes = await axios.get(cardUrl);
        console.log(cardRes);
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
