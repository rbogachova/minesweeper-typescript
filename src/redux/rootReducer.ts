import {
    openCell as openCellAction,
    labelCell as labelCellAction,
    showAllBombs as showAllBombsAction,
    restartGame as restartGameAction,
} from "./actions";
import {CHANGE_GAME_LEVEL, LABEL_CELL, OPEN_CELL, RESTART_GAME, SHOW_ALL_BOMBS} from "./utilities";

let boardDimension: number;
export const easyLevel = 'easy';
export const mediumLevel = 'medium';
export const hardLevel = 'hard';

const generateRandomNumber = (max: number): number =>
    Math.floor(Math.random() * max);

export interface ICell {
    isBomb: boolean,
    isOpen: boolean,
    bombCount: number | null,
    isFlagged: boolean,
    isQuestioned: boolean,
    rowIndex: number,
    columnIndex: number
}

function setupBomb(freeCells: Array<ICell>): void {
    let randomNumber = generateRandomNumber(freeCells.length - 1);
    freeCells[randomNumber].isBomb = true;
    freeCells.splice(randomNumber, 1);
}

function defineBoardDimension(gameLevel: string): number {
    switch (gameLevel) {
        case easyLevel:
            return boardDimension = 4;
        case mediumLevel:
            return boardDimension = 6;
        case hardLevel:
            return boardDimension = 10;
    }
    throw new Error('Unexpected gameLevel value.');
}

function createBoard(gameLevel: string): Array<Array<ICell>> {
    boardDimension = defineBoardDimension(gameLevel);

    const board: Array<Array<ICell>> = [];
    const freeCells: Array<ICell> = [];

    for (let rowIndex = 0; rowIndex <= boardDimension - 1; rowIndex++) {
        board[rowIndex] = [];
        for (let columnIndex = 0; columnIndex <= boardDimension - 1; columnIndex++) {
            const cell: ICell = {
                isBomb: false,
                isOpen: false,
                bombCount: null,
                isFlagged: false,
                isQuestioned: false,
                rowIndex,
                columnIndex
            };

            board[rowIndex][columnIndex] = cell;
            freeCells.push(cell);
        }
    }
    for (let i = 1; i <= boardDimension; i++)
        setupBomb(freeCells);

    return board;
}

const createState = (gameLevel: string): IState => ({
    board: createBoard(gameLevel),
    isGameEnded: false,
    gameLevel
});

function checkCellIsValid(board: Array<Array<ICell>>, rowIndex: number, columnIndex: number): boolean {
    const rowLength = board.length;
    const columnLength = board[0].length;
    return rowIndex >= 0 &&
        rowIndex < rowLength &&
        columnIndex >= 0 &&
        columnIndex < columnLength;
}

function checkHasBomb(board: Array<Array<ICell>>, rowIndex: number, columnIndex: number): boolean {
    return checkCellIsValid(board, rowIndex, columnIndex) &&
        board[rowIndex][columnIndex].isBomb;
}

function calculateBombCount(board: Array<Array<ICell>>, rowIndex: number, columnIndex: number): number {
    let bombCounter = 0;
    for (let rowIndexAdjustment = -1; rowIndexAdjustment <= 1; rowIndexAdjustment++) {
        for (let columnIndexAdjustment = -1; columnIndexAdjustment <= 1; columnIndexAdjustment++) {
            if (rowIndexAdjustment === 0 && columnIndexAdjustment === 0)
                continue;
            if (checkHasBomb(board, rowIndex + rowIndexAdjustment, columnIndex + columnIndexAdjustment))
                bombCounter++;
        }
    }
    return bombCounter;
}

function showAllBombs(board: Array<Array<ICell>>): void {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < board[rowIndex].length; columnIndex++) {
            if (board[rowIndex][columnIndex].isBomb)
                board[rowIndex][columnIndex].isOpen = true;
        }
    }
}

export function countCells(board: Array<Array<ICell>>, cellChecker: (cell: ICell) => boolean): number {
    return board
        .map(row => row.reduce((acc, cell) => cellChecker(cell) ? acc + 1 : acc, 0))
        .reduce((acc, rowCellCount) => acc + rowCellCount);
}

export function calculateNotMinedCells(board: Array<Array<ICell>>): number {
    const boardDimension = board.length;
    const allCellCount = boardDimension * boardDimension;
    const openNotMinedCellCount = countCells(board, cell => cell.isOpen && !cell.isBomb);

    return allCellCount - boardDimension - openNotMinedCellCount;
}

function openCell(state: IState, rowIndex: number, columnIndex: number): void {
    if (!checkCellIsValid(state.board, rowIndex, columnIndex))
        return;

    const cell = state.board[rowIndex][columnIndex];
    if (cell.isOpen)
        return;

    cell.isOpen = true;
    if (cell.isBomb) {
        showAllBombs(state.board);
        state.isGameEnded = true;
        return;
    }

    if (calculateNotMinedCells(state.board) === 0) {
        state.isGameEnded = true;
        return;
    }

    cell.bombCount = calculateBombCount(state.board, rowIndex, columnIndex);
    if (cell.bombCount !== 0)
        return;
    for (let rowIndexAdjustment = -1; rowIndexAdjustment <= 1; rowIndexAdjustment++) {
        for (let columnIndexAdjustment = -1; columnIndexAdjustment <= 1; columnIndexAdjustment++) {
            if (rowIndexAdjustment === 0 && columnIndexAdjustment === 0)
                continue;
            openCell(state, rowIndex + rowIndexAdjustment, columnIndex + columnIndexAdjustment);
        }
    }
}

const copyBoard = (board: Array<Array<ICell>>): Array<Array<ICell>> =>
    board.map(row => row.map(column => column));

export const calculateFlaggedCells = (board: Array<Array<ICell>>): number =>
    countCells(board, cell => cell.isFlagged);

function labelCell(cell: ICell, board: Array<Array<ICell>>): void {
    const flaggedCells = calculateFlaggedCells(board);

    if (cell.isFlagged) {
        cell.isFlagged = false;
        cell.isQuestioned = true;
    } else if (cell.isQuestioned) {
        cell.isQuestioned = false;
    } else if (flaggedCells < boardDimension) {
        cell.isFlagged = true;
    } else if (flaggedCells === boardDimension) {
        cell.isQuestioned = true;
    }
}

type Action = ReturnType<typeof openCellAction | typeof labelCellAction | typeof showAllBombsAction | typeof restartGameAction>;

export interface IState {
    board: any,
    isGameEnded: boolean,
    gameLevel: string
}

export const rootReducer = (state: IState = createState(easyLevel), action: Action): IState => {
    switch (action.type) {
        case OPEN_CELL: {
            const newBoard = copyBoard(state.board);
            const newState = {...state, board: newBoard};
            openCell(newState, action.payload.rowIndex, action.payload.columnIndex);

            return newState;
        }

        case LABEL_CELL: {
            const newBoard = copyBoard(state.board);
            const currentCell = newBoard[action.payload.rowIndex][action.payload.columnIndex];
            labelCell(currentCell, newBoard);

            return {...state, board: newBoard};
        }

        case RESTART_GAME: {
            return createState(action.payload.gameLevel);
        }

        case SHOW_ALL_BOMBS: {
            const newBoard = copyBoard(state.board);
            showAllBombs(newBoard);

            return {...state, board: newBoard};
        }

        case CHANGE_GAME_LEVEL: {
            return createState(action.payload.gameLevel);
        }
    }
    return state;
};
