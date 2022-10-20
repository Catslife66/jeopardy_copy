const quizCategories = [
    {
        genre: 'WHO',
        questions: [
            {
                question: "Who wrote Harry Potter?",
                answers: ['JK Rowling', 'JRR Tolkin'],
                correct: 'JK Rowling',
                level: 'easy',
            },
            {
                question: "Who was born on Krypton?",
                answers: ['Aquaman', 'Superman'],
                correct: 'Superman',
                level: 'medium',
            },
            {
                question: "Who designed the first car?",
                answers: ['Karl Benz', 'Henry Ford'],
                correct: 'Karl Benz',
                level: 'hard',
            },
        ]
    },
    {
        genre: 'WHERE',
        questions: [
            {
                question: "Where is Buckingham Palace?",
                answers: ['London', 'New York'],
                correct: 'London',
                level: 'easy',
            },
            {
                question: "Where is the Colosseum?",
                answers: ['Roman', 'Milan'],
                correct: 'Roman',
                level: 'medium',
            },
            {
                question: "Where is Mount Fuji?",
                answers: ['Japan', 'Thailand'],
                correct: 'Japan',
                level: 'hard',
            },
        ]
    },
    {
        genre: 'WHAT',
        questions: [
            {
                question: "What colour is found on 75% of the world’s flags?",
                answers: ['Red', 'Blue'],
                correct: 'Red',
                level: 'easy',
            },
            {
                question: "What was the most downloaded app of 2020?",
                answers: ['Youtube', 'TikTok'],
                correct: 'TikTok',
                level: 'medium',
            },
            {
                question: "What is the main ingredient in black pudding?",
                answers: ['Blood', 'Oats'],
                correct: 'Blood',
                level: 'hard',
            },
        ]
    },
    {
        genre: 'WHEN',
        questions: [
            {
                question: "When is the end of the First World War?",
                answers: ['1918', '1914'],
                correct: '1918',
                level: 'easy',
            },
            {
                question: "What year is William Shakespeare born?",
                answers: ['1564', '1546'],
                correct: '1564',
                level: 'medium',
            },
            {
                question: "When the first contraceptive pill made available for women?",
                answers: ['1960', '1980'],
                correct: '1960',
                level: 'hard',
            },
        ]
    },
    {
        genre: 'GENERAL',
        questions: [
            {
                question: "Which year was the first Tonka truck made?",
                answers: ['1945', '1947'],
                correct: '1947',
                level: 'easy',
            },
            {
                question: "How many breaths does the human body take daily?",
                answers: ['30,000', '20,000'],
                correct: '20,000',
                level: 'medium',
            },
            {
                question: "What is the lifespan of a dragonfly?",
                answers: ['24 hours', '48 hours'],
                correct: '24 hours',
                level: 'hard',
            },
        ]
    }
]

const gameBoard = document.querySelector('.game-board');
const scoreDisplay = document.querySelector('#score');

let score = 0;


quizCategories.forEach(category => {
    // create a genre column
    const genre = document.createElement('div');
    const genreTitle = document.createElement('div');
    genreTitle.classList.add('genre-title');
    genreTitle.textContent = category.genre;
    gameBoard.append(genre);
    genre.appendChild(genreTitle);

    // add question cards to each genre column
    category.questions.forEach((question)=> {
        const card = document.createElement('div');
        card.classList.add('card');
        genre.appendChild(card)

        card.setAttribute('data-question', question.question);
        card.setAttribute('data-answer-1', question.answers[0]);
        card.setAttribute('data-answer-2', question.answers[1]);
        card.setAttribute('data-correct', question.correct);
        
        // add points to the card
        if(question.level == 'easy'){
            card.setAttribute('data-point', '100');
        }else if(question.level == 'medium'){
            card.setAttribute('data-point', '200');
        }else{
            card.setAttribute('data-point', '300');
        }
        card.textContent = card.getAttribute('data-point');
        card.classList.add('big-font');
    })
})

const cards = document.querySelectorAll('.card');

// add eventlistener for pick a question card
cards.forEach(card => {card.addEventListener('click', pickQuestionCard)})


function pickQuestionCard() {
    // add question display div into the card
    this.textContent = '';
    this.classList.remove('big-font');
    const quiz = document.createElement('div');
    quiz.classList.add('question');
    this.appendChild(quiz);
    quiz.textContent = this.getAttribute('data-question');

    // add option buttons to the card
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    btn1.textContent = this.getAttribute('data-answer-1');
    btn2.textContent = this.getAttribute('data-answer-2');
    btn1.classList.add('options');
    btn2.classList.add('options');
    this.appendChild(btn1);
    this.appendChild(btn2);
    this.removeEventListener('click', pickQuestionCard);

    //set clicked attribute
    this.setAttribute('data-clicked', 'true')

    // add button eventlistener to check the answer
    btn1.addEventListener('click', checkAnswer);
    btn2.addEventListener('click', checkAnswer);
}


function checkAnswer(){
    if(this.parentElement.getAttribute('data-correct') == this.innerHTML){
        score += parseInt(this.parentElement.getAttribute('data-point'))
        scoreDisplay.textContent = score;
        this.classList.add('correct')
    }else {
        this.classList.add('wrong')
    }
    this.removeEventListener('click', checkAnswer)
    this.nextElementSibling ? 
    this.nextElementSibling.removeEventListener('click', checkAnswer) : 
    this.previousElementSibling.removeEventListener('click', checkAnswer);
    this.parentElement.setAttribute('data-checked', 'true')

    // close card after the question is answered
    setTimeout(closeCard, 1000)
}

function closeCard(){
    cards.forEach(card => {
        while(card.hasChildNodes() && card.getAttribute('data-clicked') == 'true' && card.getAttribute('data-checked') == 'true'){
            card.removeChild(card.children[0]);
            card.classList.add('cover');
        }
    })
}