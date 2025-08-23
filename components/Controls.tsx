
import React from 'react';
import { Direction } from '../types';
import { ArrowUpIcon, ArrowLeftIcon, ArrowDownIcon, ArrowRightIcon } from './Icons';

interface ControlsProps {
    onMove: (direction: Direction) => void;
}

const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string, 'aria-label': string }> = ({ onClick, children, className = '', 'aria-label': ariaLabel }) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={`bg-slate-700 hover:bg-cyan-500 text-slate-200 hover:text-slate-900 font-bold p-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 ${className}`}
    >
        {children}
    </button>
);


export const Controls: React.FC<ControlsProps> = ({ onMove }) => {
    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 gap-2 w-48">
                <div />
                <ControlButton onClick={() => onMove(Direction.UP)} aria-label="Move Up">
                    <ArrowUpIcon />
                </ControlButton>
                <div />

                <ControlButton onClick={() => onMove(Direction.LEFT)} aria-label="Move Left">
                    <ArrowLeftIcon />
                </ControlButton>
                <ControlButton onClick={() => onMove(Direction.DOWN)} aria-label="Move Down">
                    <ArrowDownIcon />
                </ControlButton>
                <ControlButton onClick={() => onMove(Direction.RIGHT)} aria-label="Move Right">
                    <ArrowRightIcon />
                </ControlButton>
            </div>
        </div>
    );
};
