const Card = require('./Card.js')
const Deck = require('./Deck.js')
const Player = require('./Player.js')
const Prompt = require('prompt')
var chalk = require('chalk')

const suits = ['hearts', 'clubs', 'spades', 'diamonds']
const ranks = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king']
const rankScores = { ace: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, jack: 11, king: 12, queen: 13 }

//Create Deck
let fullDeck = new Deck()
fullDeck.createNewDeck(suits,ranks,rankScores)

//Hand size
handSize = fullDeck.cards.length / 2



//Prompt for names
Prompt.start()
Prompt.get(['Player 1','Player 2'], function(err,result){
    // 
    // Log the results. 
    // 
    let playerOneName = result['Player 1']
    let playerTwoName = result['Player 2']
 

	//Create Players
	let playerOne = new Player(playerOneName,fullDeck.dealCards(handSize))
	let playerTwo = new Player(playerTwoName,fullDeck.dealCards(handSize))

	console.log(chalk.bold.blue("Let's play War!!"))

	let cardStack = []
	let round = 1
	let cont = true
	while ( playerOne.hand.length > 17  && playerTwo.hand.length > 17 ){
		console.log("============ Round " + round + " ============")
		let playerOneCard = playerOne.discard()
		let playerTwoCard = playerTwo.discard()
		cardStack.push(playerOneCard)
		cardStack.push(playerTwoCard)
		console.log(playerOne.username + " drew: " + playerOneCard[0].title)
		console.log(playerTwo.username + " drew: " + playerTwoCard[0].title)
		if ( playerOneCard[0].score > playerTwoCard[0].score ){
			console.log(chalk.underline.green(playerOne.username + " wins this round!!!"))
			while (cardStack.length !== 0){ 
				playerOne.addCards(cardStack.pop()) 
			}
			console.log(playerOne.username + " now has " + playerOne.hand.length + " cards")
			console.log(playerTwo.username + " now has " + playerTwo.hand.length + " cards")
		}
		else if ( playerOneCard[0].score < playerTwoCard[0].score ){
			console.log(chalk.underline.yellow(playerTwo.username + " wins this round!!!"))
			while (cardStack.length !== 0){ 
				playerTwo.addCards(cardStack.pop()) 
			}
			console.log(playerOne.username + " now has " + playerOne.hand.length + " cards")
			console.log(playerTwo.username + " now has " + playerTwo.hand.length + " cards")
		}
		else{
			console.log(chalk.bold.red("WAR!!!!!!!!!!!"))
		}
		if ( playerOne.hand.length === 0 || playerTwo.hand.length === 0 ){
			cont = false
		}
		console.log(cont)
		round++	
	}

	if ( playerOne.hand.length !== 0  && playerTwo.hand.length === 0 ){
		console.log(playerOne.username + " wins the game!!")
	}
	else if ( playerTwo.hand.length !== 0  && playerOne.hand.length === 0){
		console.log(playerTwo.username + " wins the game!!")
	}
	else {
		console.log("It's a tie. :-/")
	}


 });

