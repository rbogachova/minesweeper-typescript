import {CHANGE_GAME_LEVEL, LABEL_CELL, OPEN_CELL, RESTART_GAME, SHOW_ALL_BOMBS, typedAction} from "./utilities";

export const openCell = (rowIndex: number, columnIndex: number) => ({
    type: 'OPEN_CELL',
    payload: {
        rowIndex,
        columnIndex
    }
});

export const openCell2 = (rowIndex: number, columnIndex: number) => ({
    return typedAction(OPEN_CELL, {rowIndex, columnIndex});
});

export const labelCell = (rowIndex: number, columnIndex: number) => ({
    type: LABEL_CELL,
    payload: {
        rowIndex,
        columnIndex
    }
});

export const showAllBombs = () => ({
    type: SHOW_ALL_BOMBS,
});

export const restartGame = (gameLevel: string) => ({
    type: RESTART_GAME,
    payload: {
        gameLevel
    }
});

export const changeGameLevel = (gameLevel: string) => ({
    type: CHANGE_GAME_LEVEL,
    payload: {
        gameLevel
    }
});
