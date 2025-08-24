
import { useState, useCallback, useEffect } from 'react';
import { GameState, Position, Direction } from '../types.ts';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants.ts';

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
        player: { x: playerPos.x, y: playerPos.y, score: 0, hasResource: false },
        resource: resourcePos,
        home: homePos,
        field: { width: BOARD_WIDTH, height: BOARD_HEIGHT },
        statusMessage: 'Exploration started. Find the 💎!',
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

            const { player, resource, home } = currentGame;
            let newPlayerState = { ...player, x, y };
            let newResourceState = resource;
            let newStatus = 'Exploring...';

            // Check for resource collection
            if (resource && !player.hasResource && x === resource.x && y === resource.y) {
                newPlayerState.hasResource = true;
                newResourceState = null;
                newStatus = '💎 Resource collected! Take it back to the 🏠.';
            } 
            // Check if at home
            else if (x === home.x && y === home.y) {
                 if (player.hasResource) {
                     newPlayerState.score++;
                     newPlayerState.hasResource = false;
                     newResourceState = getRandomPosition([ { x, y } ]);
                     newStatus = '✅ Resource delivered! +1 point. A new 💎 has appeared.';
                 } else {
                     newStatus = '🏠 Welcome home. Go find a resource!';
                 }
            }

            return {
                ...currentGame,
                player: newPlayerState,
                resource: newResourceState,
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