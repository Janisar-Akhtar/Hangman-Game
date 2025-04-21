# Hangman Game

This is a simple Hangman game built using HTML, CSS, JavaScript, and Node.js. The game allows users to guess letters in a randomly selected word, with a limited number of incorrect guesses allowed.

## Project Structure

```
hangman-game
├── public
│   ├── index.html       # Main HTML document for the game
│   ├── styles.css       # Styles for the game
│   └── script.js        # JavaScript code for game logic
├── server
│   └── server.js        # Node.js server setup
├── package.json         # npm configuration file
└── README.md            # Project documentation
```

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hangman-game.git
   cd hangman-game
   ```

2. **Install dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Start the server**
   Run the following command to start the server:
   ```bash
   node server/server.js
   ```

4. **Open the game**
   Open your web browser and navigate to `http://localhost:3000` to play the game.

## How to Play

- A random word will be displayed with blanks for each letter.
- Guess letters by clicking on the buttons provided.
- Keep track of your incorrect guesses, as you have a limited number of attempts.
- The game ends when you either guess the word or run out of attempts.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.