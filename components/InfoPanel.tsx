
import React from 'react';

interface InfoPanelProps {
    score: number;
    statusMessage: string;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ score, statusMessage }) => {
    return (
        <div className="flex justify-between items-center bg-slate-700/50 p-4 rounded-lg border border-slate-600">
            <div className="flex items-baseline">
                <strong className="text-slate-400 mr-2">SCORE:</strong>
                <span className="text-2xl font-bold text-cyan-400">{score}</span>
            </div>
            <div className="text-right">
                <strong className="text-slate-400 block text-xs">STATUS</strong>
                <span id="status" className="text-slate-300 italic">{statusMessage}</span>
            </div>
        </div>
    );
};
