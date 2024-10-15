function calculateColCombos(winByVal) {
    let winCombos = [];
    for (let col = 0; col < boardSize; col++) {
      for (
        let startIndex = 0;
        startIndex <= boardSize - winByVal;
        startIndex++
      ) {
        let combo = [];
        for (let step = 0; step < winByVal; step++) {
          combo.push(startIndex * boardSize + step * boardSize + col);
        }
        winCombos.push(combo);
      }
    }
    return winCombos;
  }