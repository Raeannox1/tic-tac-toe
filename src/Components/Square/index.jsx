// Square.jsx
import React, { useState } from 'react';

const Square = ({ currentPokemon }) => {
    const [value, setValue] = useState(null);

    const onClick = () => {
        if (!value) {
            setValue(currentPokemon);
        }
    }

    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
};

export default Square;
