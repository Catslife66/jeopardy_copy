"# jeopardy_copy" 
A copy of the game after watching the youtube video "Let's code Jeopardy in javaScript!" made by 'Code with Ania Kubów'. I learned how to create HTML structure by using JavaScript. In her programme, there is a bug. That is the question card is picked and answered can still be picked and answered again, the score will be added up. I fix it in my version of copy.

Train of thoughts:

1. loop through all the questions to create the game-board.
jeopardyQuestionGenre.forEach(genre => {
  // create a div of a genre column for each genre
  
  // then create a div of genre title head in genre column div
    
    genre.questions.forEach(question => { 
      // make a div of card for each question, append the div into genre div
      
      // setAttribute for each card div
    })
})

2. addEventListener to pick a question card.
cards.forEach(card => {card.addEventListener('click', pickQuestionCard});

function pickQuestionCard() {
  // display the card by adding question and option buttons
  
  // addEventListener to the option buttons
  button1.addEventListener('click', checkAnswer)
  button2.addEventListener('click', checkAnswer)
  
  // removeEventListener for this card after the card is picked, so the same card cannot be picked again.
  this.removeEventListener('click', pickQuestionCard)
}

3. check if the answer is correct
function checkAnswer(){
  // get the this.parentElement attribute(card div), check if the answer attribute == this.innerHTML
  
  // once checked, removeEventListener for this
  // also removeEventListener for this.previousElementSibling or this.nextElementSibling. So no buttons in the card div can be clicked.
  
  // then setTimeout to run closeCard function 1s after the result is shown.
  setTimeout(closeCard, 1000)
}

4. close the card when the card is answered
function closeCard(){
  //loop through each card, if a card is picked && answered, close the card.
  
}
