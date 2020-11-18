import {typedAction} from "./utilities";

export const OPEN_CELL = 'OPEN_CELL';
export const LABEL_CELL = 'LABEL_CELL';
export const SHOW_ALL_BOMBS = 'SHOW_ALL_BOMBS';
export const RESTART_GAME = 'RESTART_GAME';
export const CHANGE_GAME_LEVEL = 'CHANGE_GAME_LEVEL';

export const createOpenCell = (rowIndex: number, columnIndex: number) => {
    return typedAction(OPEN_CELL, {rowIndex, columnIndex});
};

export const createLabelCell = (rowIndex: number, columnIndex: number) => {
    return typedAction(LABEL_CELL, {rowIndex, columnIndex});
};

export const createShowAllBombs = () => {
    return typedAction(SHOW_ALL_BOMBS);
};

export const createRestartGame = (gameLevel: string) => {
    return typedAction(RESTART_GAME, {gameLevel});
};

export const createChangeGameLevel = (gameLevel: string) => {
    return typedAction(CHANGE_GAME_LEVEL, {gameLevel});
};
