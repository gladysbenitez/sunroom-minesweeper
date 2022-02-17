
// import { toggleComplete, handleCellClick } from '../redux/todoSlice';
import React, { useState } from 'react';

export function Cell() {
  const [value, setValue] = useState();

  function getValue () {
    // const [value, setValue] = useState();

    if (!value.isRevealed) {
      return this.props.value.isFlagged ? '🚩' : null;
    }
    if (value.isMine) {
      return '💣';
    }
    if (value.neighbor === 0) {
      return null;
    }
    return value.neighbor;
  }

    return (
      <div 
        onClick={(event) => setValue(event.target.value)}>
      </div>
    )
}