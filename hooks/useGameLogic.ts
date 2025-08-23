
import { useState, useCallback, useEffect } from 'react';
import { GameState, Position, Direction } from '../types';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

const getRandomPosition = (existingPositions: Position[] = []): Position => {
    let newPos: Position;
    do {
        newPos = {
            x: Math.floor(Math.random() * BOARD_WIDTH),
            y: Math.floor(Math.random() * BOARD_HEIGHT),
        };
    } while (existingPositions.some(p => p.x === newPos.x && p.y === newPos.y));
    return newPos;
};

const getInitialState = (): GameState => {
    const homePos = getRandomPosition();
    const playerPos = getRandomPosition([homePos]);
    const resourcePos = getRandomPosition([homePos, playerPos]);

    return {
        player: { x: playerPos.x, y: playerPos.y, score: 0 },
        resource: resourcePos,
        home: homePos,
        field: { width: BOARD_WIDTH, height: BOARD_HEIGHT },
        statusMessage: 'Exploration started. Find the gem!',
    };
};

export const useGameLogic = () => {
    const [gameState, setGameState] = useState<GameState>(getInitialState);

    const movePlayer = useCallback((direction: Direction) => {
        setGameState(currentGame => {
            let { x, y } = currentGame.player;

            switch (direction) {
                case Direction.UP: y = Math.max(0, y - 1); break;
                case Direction.DOWN: y = Math.min(BOARD_HEIGHT - 1, y + 1); break;
                case Direction.LEFT: x = Math.max(0, x - 1); break;
                case Direction.RIGHT: x = Math.min(BOARD_WIDTH - 1, x + 1); break;
            }

            let newScore = currentGame.player.score;
            let newResourcePos = { ...currentGame.resource };
            let newStatus = 'Exploring...';
            
            // Check for resource collection
            if (x === currentGame.resource.x && y === currentGame.resource.y) {
                newScore++;
                newResourcePos = getRandomPosition([
                    { x, y },
                    currentGame.home
                ]);
                newStatus = '💎 Resource collected! +1 point.';
            } 
            // Check if at home
            else if (x === currentGame.home.x && y === currentGame.home.y) {
                 newStatus = '🏠 Back at home base. Rest and resupply!';
            }

            return {
                ...currentGame,
                player: {
                    ...currentGame.player,
                    x,
                    y,
                    score: newScore,
                },
                resource: newResourcePos,
                statusMessage: newStatus,
            };
        });
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case 'w': movePlayer(Direction.UP); break;
                case 's': movePlayer(Direction.DOWN); break;
                case 'a': movePlayer(Direction.LEFT); break;
                case 'd': movePlayer(Direction.RIGHT); break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [movePlayer]);

    return { gameState, movePlayer };
};
