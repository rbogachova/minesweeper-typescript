import React from 'react';
import {connect} from "react-redux";
import Cell from './Cell';
import {v4 as uuidv4} from 'uuid';
import {restartGame, showAllBombs, changeGameLevel} from './redux/actions';
import './app.css';
import {Alert} from 'antd';
import {selectFlaggedCells, selectNotMinedCells} from './redux/selectors';
import {easyLevel, hardLevel, ICell, IState, mediumLevel} from './redux/rootReducer';

const renderCell = (cell: ICell): JSX.Element =>
    <Cell key={uuidv4()} cell={cell}/>;

const renderRow = (row: Array<ICell>): JSX.Element =>
    <div key={uuidv4()}>{row.map(renderCell)}</div>;

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const App: React.FC<Props> = (props) => {
    const changeGameLevel = (e:  React.FormEvent<HTMLSelectElement>) =>
        props.changeGameLevel(e.currentTarget.value);

    const restart = () =>
        props.restartGame(props.gameLevel);

    const showAllBombs = () =>
        props.showAllBombs();

    const showGameOverMessage = (): JSX.Element =>
        <Alert message="GAME OVER"
               type="error"
               closable
               onClick={restart}/>;

    const showCongratulationsMessage = (): JSX.Element =>
        <Alert message="CONGRATULATIONS! YOU WON!"
               type="success"
               closable
               onClick={restart}/>;

    return (
        <div className="app">
            <table className="center">
                <tbody>
                <tr>
                    <td>
                        <h1>Minesweeper</h1>
                    </td>
                    <td>
                        <select name="levels" id="levels" onChange={changeGameLevel}>
                            <option value={easyLevel} selected>Easy</option>
                            <option value={mediumLevel}>Medium</option>
                            <option value={hardLevel}>Hard</option>
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>
            <p>Not Mined Cells: {props.notMinedCells}</p>
            <p> ☠️ ️ Bombs: {props.board.length - props.flaggedCells}</p>
            <button onClick={restart}>Restart</button>
            <button onClick={showAllBombs}>Show All Bombs</button>
            {props.board.map(renderRow)}
            {props.isGameEnded && props.notMinedCells > 0 && showGameOverMessage()}
            {props.notMinedCells === 0 && showCongratulationsMessage()}
        </div>
    );
};

const mapStateToProps = (state: IState) => ({
    board: state.board,
    isGameEnded: state.isGameEnded,
    notMinedCells: selectNotMinedCells(state),
    flaggedCells: selectFlaggedCells(state),
    gameLevel: state.gameLevel
});

const mapDispatchToProps = {
    restartGame,
    showAllBombs,
    changeGameLevel
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
