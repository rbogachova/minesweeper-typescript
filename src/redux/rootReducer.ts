import {CHANGE_GAME_LEVEL, LABEL_CELL, OPEN_CELL, RESTART_GAME, SHOW_ALL_BOMBS} from "./utilities";
import {Action, ICell, IState} from "./types";

let boardDimension: number;
export const easyLevel = 'easy';
export const mediumLevel = 'medium';
export const hardLevel = 'hard';

const generateRandomNumber = (max: number): number =>
    Math.floor(Math.random() * max);

function setupBomb(freeCells: ICell[]): void {
    const randomNumber = generateRandomNumber(freeCells.length - 1);
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

function createBoard(gameLevel: string): ICell[][] {
    boardDimension = defineBoardDimension(gameLevel);

    const board: ICell[][] = [];
    const freeCells: ICell[] = [];

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

function checkCellIsValid(board: ICell[][], rowIndex: number, columnIndex: number): boolean {
    const rowLength = board.length;
    const columnLength = board[0].length;
    return rowIndex >= 0 &&
        rowIndex < rowLength &&
        columnIndex >= 0 &&
        columnIndex < columnLength;
}

function checkHasBomb(board: ICell[][], rowIndex: number, columnIndex: number): boolean {
    return checkCellIsValid(board, rowIndex, columnIndex) &&
        board[rowIndex][columnIndex].isBomb;
}

function calculateBombCount(board: ICell[][], rowIndex: number, columnIndex: number): number {
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

function showAllBombs(board: ICell[][]): void {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < board[rowIndex].length; columnIndex++) {
            if (board[rowIndex][columnIndex].isBomb)
                board[rowIndex][columnIndex].isOpen = true;
        }
    }
}

function countCells(board: ICell[][], cellChecker: (cell: ICell) => boolean): number {
    return board
        .map(row => row.reduce((acc, cell) => cellChecker(cell) ? acc + 1 : acc, 0))
        .reduce((acc, rowCellCount) => acc + rowCellCount);
}

export function calculateNotMinedCells(board: ICell[][]): number {
    boardDimension = board.length;
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

const copyBoard = (board: ICell[][]): ICell[][] =>
    board.map(row => row.map(column => column));

export const calculateFlaggedCells = (board: ICell[][]): number =>
    countCells(board, cell => cell.isFlagged);

function labelCell(cell: ICell, board: ICell[][]): void {
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
