import React, {useState} from 'react';
import {Cell} from './Cell';
// import { initBoardData, getHidden, getFlags} from './helpers'

export function Board ({ height, width, mines }) {
  const [gameStatus, setGameStatus]= useState('');
  const [mineCount, setMineCount]= useState();
  const [boardData, setBoardData] = useState({ boardData: initBoardData(height,width,mines)});

  /* Helper Functions */

    // get mines
     const getMines= (data) => {
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
     const getFlags = (data) => {
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
     const getHidden= (data) => {
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
     function getRandomNumber(dimension) {
      return Math.floor((Math.random() * 1000) + 1) % dimension;
    }
  
     // Gets initial board data
      function initBoardData  (height, width, mines){
      let initData = createEmptyArray(height, width);
      let minesPlantedData=plantMines(initData, height, width, mines);
      let data = getNeighbors(minesPlantedData, height, width);
      return data;
    }
  
    function createEmptyArray(height, width) {
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
       function plantMines (data, height, width, mines) {
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
       function getNeighbors (data, height, width){
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
  

  // looks for neighboring cells and returns them
  function traverseBoard (x, y, data){
    const el = [];

    //up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }

    //down
    if (x < {height} - 1) {
      el.push(data[x + 1][y]);
    }

    //left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }

    //right
    if (y < {width} - 1) {
      el.push(data[x][y + 1]);
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }

    // top right
    if (x > 0 && y < {width} - 1) {
      el.push(data[x - 1][y + 1]);
    }

    // bottom right
    if (x < { height } - 1 && y < { width } - 1) {
      el.push(data[x + 1][y + 1]);
    }

    // bottom left
    if (x <{ height } - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }

    return el;
  }





    // reveals the whole board
  function revealBoard() {
    let updatedData = boardData;
    updatedData.map((dataRow) => {
      dataRow.map((dataItem) => {
        dataItem.isRevealed = true;
      });
    });
      setBoardData(updatedData)
  }

      /* reveal logic for empty cell */
      function revealEmpty(x, y, data) {
    let area = traverseBoard(x, y, data);
    area.map(value => {
      if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
        data[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          revealEmpty(value.x, value.y, data);
        }
      }
    });
    return data;
  }
  

  const handleCellClick=(x, y) =>{
    // check if revealed. return if true.
    if (
     boardData[x][y].isRevealed ||
     boardData[x][y].isFlagged
    )
      return null;

    // check if mine. game over if true
    if (boardData[x][y].isMine) {
      setGameStatus('You Lost.');
      revealBoard();
      alert('game over');
    }

    let updatedData = boardData;
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
      updatedData = this.revealEmpty(x, y, updatedData);
    }

    if (getHidden(updatedData).length === mines) {
      setGameStatus('You Win.');
      setMineCount(0);
      revealBoard();
      alert('You Win');
    }
      setBoardData(updatedData),
      setMineCount(mines - getFlags(updatedData).length)
  }

  function renderBoard(data){
   console.log(data,'data')
    return  data.map((dataRow) => {
      return dataRow.map((dataItem) => {
        return (
          <div >
            <Cell
              onClick={() => handleCellClick(dataItem.x, dataItem.y)}
              // cMenu={(e) => this.handleContextMenu(e, dataItem.x, dataItem.y)}
              value={dataItem}
            />
          </div>
        );
      });
    });
  }


// render() {
  /// boards
  return (
    <div className="board">
      <div className="game-info">
        <span className="info">Mines remaining: {mineCount}</span>
        <h1 className="info">{gameStatus}</h1>
      </div>
      {
        renderBoard(boardData)
      }
    </div>
  );
};





