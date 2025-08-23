
export interface Position {
  x: number;
  y: number;
}

export interface Player extends Position {
  score: number;
}

export interface GameState {
  player: Player;
  resource: Position;
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
