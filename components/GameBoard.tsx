
import React from 'react';
import { GameState } from '../types.ts';
import { PLAYER_CHAR, PLAYER_CARRYING_CHAR, RESOURCE_CHAR, HOME_CHAR, EMPTY_CHAR } from '../constants.ts';

interface GameBoardProps {
    gameState: GameState;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState }) => {
    const { player, resource, home, field } = gameState;

    const renderCellContent = (x: number, y: number) => {
        if (x === player.x && y === player.y) {
            return player.hasResource ? PLAYER_CARRYING_CHAR : PLAYER_CHAR;
        }
        if (resource && x === resource.x && y === resource.y) return RESOURCE_CHAR;
        if (x === home.x && y === home.y) return HOME_CHAR;
        return EMPTY_CHAR;
    };
    
    return (
        <div className="my-6 bg-slate-900/50 p-2 rounded-lg border-2 border-slate-700">
            <div 
                className="grid gap-1"
                style={{
                    gridTemplateColumns: `repeat(${field.width}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${field.height}, minmax(0, 1fr))`
                }}
            >
                {Array.from({ length: field.height * field.width }).map((_, index) => {
                    const y = Math.floor(index / field.width);
                    const x = index % field.width;
                    const isPlayerCell = x === player.x && y === player.y;

                    return (
                        <div
                            key={`${x}-${y}`}
                            className={`flex items-center justify-center w-full aspect-square text-2xl rounded-md transition-colors
                                ${isPlayerCell ? 'bg-cyan-500/20' : 'bg-slate-700/50'}`}
                        >
                           {renderCellContent(x, y)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};