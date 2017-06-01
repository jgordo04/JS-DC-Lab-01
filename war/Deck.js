const Card = require('./Card.js')

class Deck {

	constructor(){
		this.cards = []
	}

	createNewDeck(suits,ranks,scores){
		if ( this.cards.length === 0 ){
			for ( let i = 0; i < suits.length; i++ ){
				for ( let j = 0; j < ranks.length; j++ ){
					this.cards.push(new Card(suits[i],ranks[j],scores[ranks[j]]))
				}
			}
		}
		else { console.log("Deck already populated")}
	}

	dealCards(num){
		let dealtCards = []
		for ( let i = 0; i < num; i++ ){
			dealtCards.push(this.cards.splice(Math.floor(Math.random()*this.cards.length),1)[0])
		}
		return dealtCards
	}

}

module.exports = Deck