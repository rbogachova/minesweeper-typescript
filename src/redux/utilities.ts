export const OPEN_CELL = 'OPEN_CELL';
export const LABEL_CELL = 'LABEL_CELL';
export const SHOW_ALL_BOMBS = 'SHOW_ALL_BOMBS';
export const RESTART_GAME = 'RESTART_GAME';
export const CHANGE_GAME_LEVEL = 'CHANGE_GAME_LEVEL';

export function typedAction<T extends string>(type: T): { type: T };

export function typedAction<T extends string, P extends any>(type: T, payload: P): { type: T; payload: P };

export function typedAction(type: string, payload?: any) {
    return { type, payload };
}
