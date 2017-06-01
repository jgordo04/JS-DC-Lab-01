
class Player {

	constructor(username,hand){
		this.username = username
		this.hand = hand
	}

	discard(){
		return this.hand.pop()
	}

	addCards(cards){
		this.hand.unshift(cards)
	}

}

module.exports = Player