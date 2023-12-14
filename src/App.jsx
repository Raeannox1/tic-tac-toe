import React from "react";
import {Routes, Route} from 'react-router-dom';
import GameBoard from "./Components/GameBoard";
import PokemonPicker from "./Components/PokemonPicker";

import './GameBoard.css';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<GameBoard />} />
            <Route path="/pokemon-picker" element={<PokemonPicker />} />
            <Route path="*" element={<GameBoard />} />
        </Routes>
    )
};

export default App;
