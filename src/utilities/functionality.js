export function checkGameStatus(arr, winByVal = 3, boardSize = 3, winSetter) {
    checkWinner();
    function checkWinner() {
      for (let combo of calculateCombos(winByVal)) {
        let winning = true;
        let firstValue = arr[combo[0]].val;
        if (firstValue === null) {
          winning = false;
        } else {
          for (let comboIndex of combo) {
            if (arr[comboIndex].val !== firstValue) {
              winning = false;
              break;
            }
          }
        }
        if (winning) {
          winSetter("yes");
          return;
        }
      }
      checkDraw();
    }
    function calculateCombos(winByVal) {
      let combos = [
        ...calculateRowCombos(winByVal),
        ...calculateColCombos(winByVal),
        ...calculateDiagonalCombosLTR(winByVal),
        ...calculateDiagonalCombosRTL(winByVal),
      ];
      return combos;
    }
    function calculateStartIndexesLTR(winByVal) {
      let startIndexes = [];
      for (let i = 0; i < boardSize - (winByVal - 1); i++) {
        for (let j = 0; j < boardSize - (winByVal - 1); j++) {
          startIndexes.push(i + j * boardSize);
        }
      }
      return startIndexes;
    }
    function calculateStartIndexesRTL(winByVal) {
      let startIndexes = [];
      for (let i = boardSize - 1; i >= winByVal - 1; i--) {
        for (let j = 0; j < boardSize - (winByVal - 1); j++) {
          startIndexes.push(i + j * boardSize);
        }
      }
      return startIndexes;
    }
    function calculateDiagonalCombosRTL(winByVal) {
      let winCombos = [];
      for (let startIndex of calculateStartIndexesRTL(winByVal)) {
        let winArr = [];
        for (let i = 0; i < winByVal; i++) {
          winArr.push(startIndex + (i * boardSize - i));
        }
        winCombos.push(winArr);
      }
      return winCombos;
    }
    function calculateDiagonalCombosLTR(winByVal) {
      let winCombos = [];
      for (let startIndex of calculateStartIndexesLTR(winByVal)) {
        let winArr = [];
        for (let i = 0; i < winByVal; i++) {
          winArr.push(startIndex + (i * boardSize + i));
        }
        winCombos.push(winArr);
      }
      return winCombos;
    }
    function calculateColCombos(winByVal) {
      let winCombos = [];
      for (let col = 0; col < boardSize; col++) {
        for (let startIndex = 0; startIndex <= boardSize - winByVal; startIndex++) {
          let combo = [];
          for (let step = 0; step < winByVal; step++) {
            combo.push(startIndex * boardSize + step * boardSize + col);
          }
          winCombos.push(combo);
        }
      }
      return winCombos;
    }
    function calculateRowCombos(winByVal) {
      let winCombos = [];
      for (let row = 0; row < boardSize; row++) {
        for (let startIndex = 0; startIndex <= boardSize - winByVal; startIndex++) {
          let combo = [];
          for (let step = 0; step < winByVal; step++) {
            combo.push(boardSize * row + startIndex + step);
          }
          winCombos.push(combo);
        }
      }
      return winCombos;
    }
    function checkDraw() {
      let draw = arr.every((data) => data.val !== null);
      draw && winSetter("draw");
    }
  }
  