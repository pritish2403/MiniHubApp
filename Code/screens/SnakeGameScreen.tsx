// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';

// // Type definitions
// interface Position {
//   x: number;
//   y: number;
// }

// interface Direction {
//   x: number;
//   y: number;
// }

// interface TouchStart {
//   x: number;
//   y: number;
// }

// const GRID_SIZE = 20;
// const CELL_SIZE = 15;
// const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
// const INITIAL_DIRECTION: Direction = { x: 0, y: -1 };
// const INITIAL_FOOD: Position = { x: 5, y: 5 };

// export default function SnakeGameScreen() {
//   const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
//   const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
//   const [food, setFood] = useState<Position>(INITIAL_FOOD);
//   const [gameRunning, setGameRunning] = useState<boolean>(false);
//   const [score, setScore] = useState<number>(0);
//   const [touchStart, setTouchStart] = useState<TouchStart | null>(null);

//   const generateFood = useCallback((): Position => {
//     let newFood: Position;
//     do {
//       newFood = {
//         x: Math.floor(Math.random() * GRID_SIZE),
//         y: Math.floor(Math.random() * GRID_SIZE)
//       };
//     } while (snake.some((segment: Position) => segment.x === newFood.x && segment.y === newFood.y));
//     return newFood;
//   }, [snake]);

//   const resetGame = (): void => {
//     setSnake(INITIAL_SNAKE);
//     setDirection(INITIAL_DIRECTION);
//     setFood(INITIAL_FOOD);
//     setScore(0);
//     setGameRunning(true);
//   };

//   const gameLoop = useCallback((): void => {
//     if (!gameRunning) return;

//     setSnake((currentSnake: Position[]) => {
//       const newSnake = [...currentSnake];
//       const head: Position = { ...newSnake[0] };
      
//       head.x += direction.x;
//       head.y += direction.y;

//       // Check wall collision
//       if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
//         setGameRunning(false);
//         return currentSnake;
//       }

//       // Check self collision
//       if (newSnake.some((segment: Position) => segment.x === head.x && segment.y === head.y)) {
//         setGameRunning(false);
//         return currentSnake;
//       }

//       newSnake.unshift(head);

//       // Check food collision
//       if (head.x === food.x && head.y === food.y) {
//         setScore((prev: number) => prev + 10);
//         setFood(generateFood());
//       } else {
//         newSnake.pop();
//       }

//       return newSnake;
//     });
//   }, [direction, food, gameRunning, generateFood]);

//   useEffect(() => {
//     if (!gameRunning) return;
    
//     const interval = setInterval(gameLoop, 150);
//     return () => clearInterval(interval);
//   }, [gameLoop, gameRunning]);

//   const handleKeyPress = useCallback((e: KeyboardEvent): void => {
//     if (!gameRunning) return;
    
//     switch (e.key) {
//       case 'ArrowUp':
//         if (direction.y === 0) setDirection({ x: 0, y: -1 });
//         break;
//       case 'ArrowDown':
//         if (direction.y === 0) setDirection({ x: 0, y: 1 });
//         break;
//       case 'ArrowLeft':
//         if (direction.x === 0) setDirection({ x: -1, y: 0 });
//         break;
//       case 'ArrowRight':
//         if (direction.x === 0) setDirection({ x: 1, y: 0 });
//         break;
//     }
//   }, [direction, gameRunning]);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       window.addEventListener('keydown', handleKeyPress);
//       return () => window.removeEventListener('keydown', handleKeyPress);
//     }
//   }, [handleKeyPress]);

//   const handleTouchStart = (e: any): void => {
//     const touch = e.nativeEvent.touches[0];
//     setTouchStart({ x: touch.pageX, y: touch.pageY });
//   };

//   const handleTouchEnd = (e: any): void => {
//     if (!touchStart || !gameRunning) return;
    
//     const touch = e.nativeEvent.changedTouches[0];
//     const deltaX = touch.pageX - touchStart.x;
//     const deltaY = touch.pageY - touchStart.y;
//     const minSwipeDistance = 30;

//     if (Math.abs(deltaX) > Math.abs(deltaY)) {
//       // Horizontal swipe
//       if (Math.abs(deltaX) > minSwipeDistance && direction.x === 0) {
//         setDirection(deltaX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
//       }
//     } else {
//       // Vertical swipe
//       if (Math.abs(deltaY) > minSwipeDistance && direction.y === 0) {
//         setDirection(deltaY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
//       }
//     }
    
//     setTouchStart(null);
//   };

//   const renderCell = (x: number, y: number): React.ReactElement => {
//     const isSnake = snake.some((segment: Position) => segment.x === x && segment.y === y);
//     const isHead = snake[0]?.x === x && snake[0]?.y === y;
//     const isFood = food.x === x && food.y === y;
    
//     let backgroundColor = '#f3f4f6'; // gray-100
//     if (isFood) {
//       backgroundColor = '#ef4444'; // red-500
//     } else if (isHead) {
//       backgroundColor = '#15803d'; // green-700
//     } else if (isSnake) {
//       backgroundColor = '#22c55e'; // green-500
//     }
    
//     return (
//       <View
//         key={`${x}-${y}`}
//         style={{
//           width: CELL_SIZE,
//           height: CELL_SIZE,
//           backgroundColor,
//           borderWidth: 1,
//           borderColor: '#d1d5db' // gray-300
//         }}
//       />
//     );
//   };

//   return (
//     <View style={{ 
//       flex: 1, 
//       backgroundColor: '#000000', 
//       alignItems: 'center', 
//       justifyContent: 'center',
//       padding: 16
//     }}>
//       <View style={{
//         backgroundColor: '#111827', // gray-900
//         padding: 24,
//         borderRadius: 8,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 8,
//         elevation: 8
//       }}>
//         <View style={{ alignItems: 'center', marginBottom: 16 }}>
//           <Text style={{ 
//             fontSize: 24, 
//             fontWeight: 'bold', 
//             color: '#4ade80', // green-400
//             marginBottom: 8 
//           }}>
//             SNAKE
//           </Text>
//           <Text style={{ 
//             fontSize: 18, 
//             color: '#ffffff', 
//             marginBottom: 8 
//           }}>
//             Score: {score}
//           </Text>
//           {!gameRunning && score > 0 && (
//             <Text style={{ 
//               color: '#f87171', // red-400
//               fontSize: 16, 
//               marginBottom: 8 
//             }}>
//               Game Over!
//             </Text>
//           )}
//         </View>
        
//         <View 
//           style={{ 
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             width: GRID_SIZE * CELL_SIZE,
//             height: GRID_SIZE * CELL_SIZE,
//             borderWidth: 2,
//             borderColor: '#4b5563', // gray-600
//             backgroundColor: '#374151', // gray-800
//             marginBottom: 16
//           }}
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//         >
//           {Array.from({ length: GRID_SIZE }, (_, y) =>
//             Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y))
//           )}
//         </View>
        
//         <View style={{ alignItems: 'center' }}>
//           <TouchableOpacity
//             onPress={resetGame}
//             style={{
//               backgroundColor: '#16a34a', // green-600
//               paddingVertical: 12,
//               paddingHorizontal: 24,
//               borderRadius: 8
//             }}
//           >
//             <Text style={{
//               color: '#ffffff',
//               fontWeight: 'bold',
//               fontSize: 16
//             }}>
//               {gameRunning ? 'Restart' : 'Start Game'}
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         <View style={{ alignItems: 'center', marginTop: 16 }}>
//           <Text style={{ color: '#9ca3af', fontSize: 12 }}>
//             Mobile: Touch and swipe to control
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// }