document.addEventListener('DOMContentLoaded', () => {
    const wordDisplay = document.getElementById('wordDisplay');
    const wordLengthDisplay = document.getElementById('wordLengthDisplay');
    const guessedLettersDisplay = document.getElementById('guessedLettersDisplay');
    const letterInput = document.getElementById('letterInput');
    const guessButton = document.getElementById('guessButton');
    const newGameButton = document.getElementById('newGameButton');
    const attemptsLeftDisplay = document.getElementById('attemptsLeftDisplay');
    const messageDisplay = document.getElementById('messageDisplay');
    const categoryDisplay = document.getElementById('categoryDisplay');

    const game = new HangmanGame();

    // Trigger the "Guess" button when Enter is pressed
    letterInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            guessButton.click();
        }
    });

    guessButton.addEventListener('click', () => {
        const letter = letterInput.value.toLowerCase();
        if (letter) {
            game.guessLetter(letter);
            letterInput.value = '';
            updateDisplay();
        }
    });

    newGameButton.addEventListener('click', () => {
        game.startGame();
        updateDisplay();
    });

    function updateDisplay() {
        wordDisplay.innerHTML = game.getWordDisplay();
        wordLengthDisplay.innerHTML = `Word length: ${game.selectedWord.length}`;
        guessedLettersDisplay.innerHTML = `Guessed letters: ${game.guessedLetters.join(', ')}`;
        attemptsLeftDisplay.innerHTML = `Attempts left: ${game.attemptsLeft}`;
        messageDisplay.innerHTML = game.message;
        categoryDisplay.innerHTML = `Category: ${game.category}`;

        // Apply success or failure styles
        if (game.message.includes('Congratulations')) {
            messageDisplay.classList.add('success');
            messageDisplay.classList.remove('failure');
        } else if (game.message.includes('Game over')) {
            messageDisplay.classList.add('failure');
            messageDisplay.classList.remove('success');
        } else {
            messageDisplay.classList.remove('success', 'failure');
        }
    }

    game.startGame();
    updateDisplay();
});

function HangmanGame() {
    this.categories = {
        countries: ["afghanistan", "armenia", "azerbaijan", "bahrain", "bangladesh", "bhutan", 
            "brunei", "cambodia", "china", "cyprus", "georgia", "india", "indonesia", 
            "iran", "iraq", "japan", "jordan", "kazakhstan", "kuwait", 
            "kyrgyzstan", "laos", "lebanon", "malaysia", "maldives", "mongolia", 
            "myanmar", "nepal", "northkorea", "oman", "pakistan", "palestine", 
            "philippines", "qatar", "saudiarabia", "singapore", "southkorea", 
            "srilanka", "syria", "taiwan", "tajikistan", "thailand", 
            "turkey", "turkmenistan", "uzbekistan", "vietnam", "yemen"],
        animals: ["dog", "cat", "elephant", "tiger", "lion", "giraffe", "zebra", "kangaroo", "panda", "bear"],
        fruits: ["apple", "banana", "cherry", "grape", "mango", "orange", "peach", "pear", "pineapple", "watermelon"],
        vegetables: ["carrot", "broccoli", "spinach", "potato", "tomato", "onion", "cucumber", "pepper", "lettuce", "pumpkin"]
    };

    this.selectedWord = '';
    this.guessedLetters = [];
    this.attemptsLeft = 6;
    this.message = '';
    this.category = '';

    this.startGame = function() {
        const categories = Object.keys(this.categories);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        this.category = randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1);
        const words = this.categories[randomCategory];
        this.selectedWord = words[Math.floor(Math.random() * words.length)];
        this.guessedLetters = [];
        this.attemptsLeft = 6;
        this.message = '';
    };

    this.guessLetter = function(letter) {
        if (!this.guessedLetters.includes(letter)) {
            this.guessedLetters.push(letter);
            if (!this.selectedWord.includes(letter)) {
                this.attemptsLeft--;
            }
        }

        if (this.checkWin()) {
            this.message = `Congratulations! You guessed the word "${this.selectedWord}" successfully!`;
            setTimeout(() => {
                this.startGame();
                updateDisplay();
            }, 3000);
        } else if (this.attemptsLeft <= 0) {
            this.message = `Game over! The word was: ${this.selectedWord}`;
            setTimeout(() => {
                this.startGame();
                updateDisplay();
            }, 3000);
        }
    };

    this.getWordDisplay = function() {
        return this.selectedWord.split('').map(letter => (this.guessedLetters.includes(letter) ? letter : '_')).join(' ');
    };

    this.checkWin = function() {
        return this.selectedWord.split('').every(letter => this.guessedLetters.includes(letter));
    };
}