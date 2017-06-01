class Card {
	constructor(suit,rank,score){
		this.suit = suit
		this.rank = rank
		this.score = score
		this.title = this.rank + " of " + this.suit
	}
}

module.exports = Card