import {CHANGE_GAME_LEVEL, LABEL_CELL, OPEN_CELL, RESTART_GAME, SHOW_ALL_BOMBS, typedAction} from "./utilities";

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
