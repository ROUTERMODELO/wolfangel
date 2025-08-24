
import React from 'react';
import { GameBoard } from './components/GameBoard.tsx';
import { InfoPanel } from './components/InfoPanel.tsx';
import { Controls } from './components/Controls.tsx';
import { useGameLogic } from './hooks/useGameLogic.ts';
import { GithubIcon } from './components/Icons.tsx';

export default function App(): React.ReactNode {
    const { gameState, movePlayer } = useGameLogic();

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-lg mx-auto">
                <header className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-cyan-400 tracking-wider">Grid Explorer</h1>
                    <p className="text-slate-400 mt-2">(NFT Game Prototype)</p>
                </header>
                
                <main className="bg-slate-800 rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 border border-slate-700">
                    <InfoPanel score={gameState.player.score} statusMessage={gameState.statusMessage} />
                    <GameBoard gameState={gameState} />
                    <Controls onMove={movePlayer} />
                </main>

                <footer className="text-center mt-8 text-slate-500">
                    <p>Use W, A, S, D or the buttons to move.</p>
                    <p>Collect 💎 and bring them back to your 🏠.</p>
                     <div className="flex justify-center mt-4">
                        <a href="https://github.com/google-gemini/web-prototypes/tree/main/grid-explorer" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="View source on GitHub">
                            <GithubIcon />
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}