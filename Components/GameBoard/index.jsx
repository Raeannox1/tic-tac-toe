// GameBoard.jsx
import React, { useState, useEffect } from 'react';
import Square from './Square';
import PokemonPicker from './PokemonPicker';
import axios from 'axios';



const GameBoard = () => {

    return (
        <div>
            <PokemonPicker />
            <Square />
        </div>
    );
};

export default GameBoard;
