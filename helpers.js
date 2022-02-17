
  /* Helper Functions */

  // get mines
  export const getMines= (data) => {
    let mineArray = [];

    data.map(dataRow => {
      dataRow.map((dataItem) => {
        if (dataItem.isMine) {
          mineArray.push(dataItem);
        }
      });
    });

    return mineArray;
  }

  // get Flags
  export const getFlags = (data) => {
    let mineArray = [];

    data.map(dataRow => {
      dataRow.map((dataItem) => {
        if (dataItem.isFlagged) {
          mineArray.push(dataItem);
        }
      });
    });

    return mineArray;
  }

  // get Hidden cells
  export const getHidden= (data) => {
    let mineArray = [];

    data.map(dataRow => {
      dataRow.map((dataItem) => {
        if (!dataItem.isRevealed) {
          mineArray.push(dataItem);
        }
      });
    });

    return mineArray;
  }


   // get random number given a dimension
  export const getRandomNumber=(dimension)=> {
    return Math.floor((Math.random() * 1000) + 1) % dimension;
  }

   // Gets initial board data
   export const initBoardData = (height, width, mines)=> {
    let initData = createEmptyArray(height, width);
    let minesPlantedData=plantMines(initData, height, width, mines);
    let data = getNeighbors(minesPlantedData, height, width);
    return data;
  }

  export const createEmptyArray= (height, width) =>{
    let data = [];

    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbor: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    return data;
  }
    // plant mines on the board
    export const plantMines = (data, height, width, mines)=> {
      let randomX, randomY, minesPlanted = 0;
  
      while (minesPlanted < mines) {
        randomX = getRandomNumber(width);
        randomY = getRandomNumber(height);
        if (!(data[randomX][randomY].isMine)) {
          data[randomX][randomY].isMine = true;
          minesPlanted++;
        }
      }

      return (data);
    }

    // get number of neighboring mines for each board cell
    export const getNeighbors = (data, height, width)=> {
    let updatedData = data, index = 0;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = traverseBoard(data[i][j].x, data[i][j].y, data);
          area.map(value => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          updatedData[i][j].neighbor = mine;
        }
      }
    }

    return (updatedData);
  };




