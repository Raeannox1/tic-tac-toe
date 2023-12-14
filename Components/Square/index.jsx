// Square.jsx
import React from 'react';
import { useState } from 'react';

const Square = () => {

    const [value, setValue] = useState(null);

    const onClick = () => {
        setValue('X');
    }
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
};

export default Square;