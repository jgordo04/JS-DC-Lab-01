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

	// for ( let i = 0; i < playerOne.hand.length; i++){
	// 	for ( let j = 0; j < playerTwo.hand.length; j++){
	// 		if ( playerOne.hand[i] === playerTwo.hand[j] ){
	// 			console.log("DUPLICATE!!!!!")
	// 		}
	// 	}
	// }

	console.log(chalk.bold.blue("Let's play War!!"))

	let cardStack = []
	let round = 1
	while ( playerOne.hand.length > 0  && playerTwo.hand.length > 0 && round < 10000){
		console.log("============ Round " + round + " ============")
		let playerOneCard = playerOne.discard()
		let playerTwoCard = playerTwo.discard()
		//let playerOneCard = playerOneTemp[0]
		//let playerTwoCard = playerTwoTemp[0]
		cardStack.push(playerOneCard)
		cardStack.push(playerTwoCard)
		//console.log(playerOneTemp)
		console.log(playerOne.username + " drew: " + playerOneCard.title)
		console.log(playerTwo.username + " drew: " + playerTwoCard.title)
		if ( playerOneCard.score > playerTwoCard.score ){
			console.log(chalk.underline.green(playerOne.username + " wins this round!!!"))
			while (cardStack.length !== 0){ 
				playerOne.addCards(cardStack.splice(Math.floor(Math.random()*cardStack.length),1)[0])
			}
			console.log(playerOne.username + " now has " + playerOne.hand.length + " cards")
			console.log(playerTwo.username + " now has " + playerTwo.hand.length + " cards")
		}
		else if ( playerOneCard.score < playerTwoCard.score ){
			console.log(chalk.underline.yellow(playerTwo.username + " wins this round!!!"))
			while (cardStack.length !== 0){ 
				playerTwo.addCards(cardStack.splice(Math.floor(Math.random()*cardStack.length),1)[0])
			}
			console.log(playerOne.username + " now has " + playerOne.hand.length + " cards")
			console.log(playerTwo.username + " now has " + playerTwo.hand.length + " cards")
		}
		else{
			console.log(chalk.bold.red("WAR!!!!!!!!!!!"))
		}
		if ( playerOne.hand.length > 0 && playerTwo.hand.length > 0 ){

		}
		round++	
	}

	if ( playerOne.hand.length !== 0  && playerTwo.hand.length === 0 ){
		console.log(chalk.bold.green("##############################"))
		console.log(chalk.bold.green("##### " + playerOne.username + " wins the game!! ######"))
		console.log(chalk.bold.green("##############################"))
	}
	else if ( playerTwo.hand.length !== 0  && playerOne.hand.length === 0){
		console.log(chalk.bold.yellow("##############################"))
		console.log(chalk.bold.yellow("##### " + playerTwo.username + " wins the game!! ######"))
		console.log(chalk.bold.yellow("##############################"))
	}
	else {
		console.log("It's a tie. :-/")
	}


 });

