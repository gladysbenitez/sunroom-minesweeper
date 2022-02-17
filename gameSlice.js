// import {createSlice } from '@reduxjs/toolkit';

// export const gameSlice = createSlice({
// 	name: 'cells',
// 	initialState: [{
//       width,
//       height, 
//       mineCount,
//       lost: false,
//       won: false,
//       startTime: null, // starts when the first cell is clicked
//       endTime: null, // set when won/lost
//       grid: range(0, height).map((y) => range(0, width).map((x) => {
//         return {
//           id: `cell-${x}-${y}`,
//           isEmpty: true,
//           isFlagged: false,
//           isMine: false,
//           isRevealed: false,
//           neighbor: 0,
//           x,
//           y,
//         };
//       }))
//     }
//   ],
// 	reducers: {
//     handleCellClick: (state, action) => {
//       return {
//         isEmpty: action.payload.isEmpty,
//         isFlagged: false, //not right click..so if reg-click then => false 
//         isRevealed: true,// on click you are reveling something 
//       }
//     },
//     toggleComplete: (state, action) => {
// 			const index = state.findIndex((cell) => todo.id === action.payload.id);
// 			state[index].completed = action.payload.completed;
// 		},
// 	},
//   extraReducers: {
// 		[addDimensionAsync.fulfilled]: (state, action) => {
// 			return action.payload.todos;
// 		},
// 	},
//   addDimensionAsync
// });
   

// export const { handleCellClick, toggleComplete} = todoSlice.actions;

// export default todoSlice.reducer;
