import {createSelector} from 'reselect';
import {calculateNotMinedCells, calculateFlaggedCells} from './rootReducer';
import {IState} from "./types";

const selectBoard = (state: IState) => state.board;

export const selectNotMinedCells = createSelector(
    [selectBoard],
    calculateNotMinedCells);

export const selectFlaggedCells = createSelector(
    [selectBoard],
    calculateFlaggedCells);
