import {createSelector} from 'reselect';
import {calculateNotMinedCells, calculateFlaggedCells, IState} from './rootReducer';

const selectBoard = (state: IState) => state.board;

export const selectNotMinedCells = createSelector(
    [selectBoard],
    calculateNotMinedCells);

export const selectFlaggedCells = createSelector(
    [selectBoard],
    calculateFlaggedCells);
