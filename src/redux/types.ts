import {
    createChangeGameLevel,
    createLabelCell,
    createOpenCell,
    createRestartGame,
    createShowAllBombs
} from "./actions";

export interface ICell {
    isBomb: boolean,
    isOpen: boolean,
    bombCount: number | null,
    isFlagged: boolean,
    isQuestioned: boolean,
    rowIndex: number,
    columnIndex: number
}

export type Action = ReturnType<typeof createOpenCell | typeof createLabelCell | typeof createShowAllBombs | typeof createRestartGame | typeof createChangeGameLevel>;

export interface IState {
    board: ICell[][],
    isGameEnded: boolean,
    gameLevel: string
}