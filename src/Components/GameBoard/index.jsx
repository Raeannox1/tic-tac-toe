import React, { useState, useEffect } from "react";
import Square from "..Square/";
import PokemonPicker from "..PokemonPicker/";
import axios from "axios";
import "./GameBoard.css";

const GameBoard = () => {
  // State declarations
  const [pokemonList, setPokemonList] = useState([]);
  const [playerOnePokemon, setPlayerOnePokemon] = useState(null);
  const [playerTwoPokemon, setPlayerTwoPokemon] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  // Effect for fetching Pokémon list
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => setPokemonList(response.data.results))
      .catch((error) => console.log(error));
  }, []);

  // Handle square click
  const handleSquareClick = (index) => {
    if (gameOver || board[index] || !playerOnePokemon || !playerTwoPokemon)
      return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer === 1 ? playerOnePokemon : playerTwoPokemon;
    setBoard(newBoard);

    checkForWinner(newBoard, currentPlayer);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  // Check for a winner or a tie
  const checkForWinner = (newBoard, player) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        updateScore(player);
        setGameOver(true);
        return;
      }
    }

    if (!newBoard.includes(null)) {
      console.log("It's a tie!");
      startNewRound();
    }
  };

  // Update the score of the winner
  const updateScore = (winner) => {
    if (winner === 1) {
      setPlayerOneScore(playerOneScore + 1);
    } else {
      setPlayerTwoScore(playerTwoScore + 1);
    }
    setTimeout(startNewRound, 1000); // Delay before starting a new round
  };

  // Start a new round or reset the game
  const startNewRound = () => {
    if (currentRound < 3) {
      setCurrentRound(currentRound + 1);
      setBoard(Array(9).fill(null));
      setGameOver(false);
    } else {
      console.log("Game ended!");
      resetGame();
    }
  };

  // Reset game state
  const resetGame = () => {
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setCurrentRound(1);
    setBoard(Array(9).fill(null));
    setGameOver(false);
  };

  // Handle Pokémon selection for players
  const handlePokemonSelect = (player, pokemon) => {
    if (player === 1) {
      setPlayerOnePokemon(pokemon);
      setRandomPokemonForPlayerTwo();
    }
  };

  // Set a random Pokémon for Player 2
  const setRandomPokemonForPlayerTwo = () => {
    if (pokemonList.length > 0) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      setPlayerTwoPokemon(pokemonList[randomIndex].name);
    }
  };

  // Render component
  return (
    <div>
      <h2>Player 1, choose your Pokémon:</h2>
      <PokemonPicker
        onSelectPokemon={(pokemon) => handlePokemonSelect(1, pokemon)}
      />

      <h2>
        Score: Player 1 - {playerOneScore} | Player 2 - {playerTwoScore}
      </h2>
      <h3>Round: {currentRound} of 3</h3>

      <div className="board">
        {board.map((square, index) => (
          <Square
            key={index}
            value={square}
            onClick={() => handleSquareClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
