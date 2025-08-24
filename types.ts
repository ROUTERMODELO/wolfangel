export interface Position {
  x: number;
  y: number;
}

export interface Player extends Position {
  score: number;
  hasResource: boolean;
}

export interface GameState {
  player: Player;
  resource: Position | null;
  home: Position;
  field: {
    width: number;
    height: number;
  };
  statusMessage: string;
}

export enum Direction {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}