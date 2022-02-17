import React from "react";
import { GameTitle } from './components/Game.styled';
import { Board } from './components/Board';

 function App() {
	 const initialBoardData = {
		height: 8,
		width: 8,
		mines: 4
	};
	return (
			<div>
				<GameTitle>Sunroom Minesweeper</GameTitle>
				<Board 
					height={initialBoardData.height}
					width={initialBoardData.width}
					mines={initialBoardData.mines}
				>
				</Board>
			
			</div>
	);
}

export default App;


