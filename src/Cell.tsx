import React from 'react';
import {connect} from 'react-redux';
import {createOpenCell, createLabelCell} from './redux/actions';
import './cell.css';
import 'antd/dist/antd.css';
import {ICell, IState} from "./redux/types";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { cell: ICell };

const Cell: React.FC<Props> = (props) => {
    const openCell = () => {
        if (props.cell.isOpen || props.isGameEnded)
            return;

        props.openCell(props.cell.rowIndex, props.cell.columnIndex);
    };

    const labelCell = (e: React.MouseEvent) => {
        e.preventDefault();
        props.labelCell(props.cell.rowIndex, props.cell.columnIndex);
    };

    const renderCellContent = () => {
        if (!props.cell.isOpen) {
            if (props.cell.isFlagged)
                return '☠️';
            else if (props.cell.isQuestioned)
                return '?';
            else
                return null;
        }

        if (props.cell.bombCount === 0)
            return null;

        return props.cell.isBomb
            ? '💣' // TODO: change.
            : props.cell.bombCount;
    };

    const getCellClass = () =>
        props.cell.isOpen ? "openCell" : "initialCell";

    return (
        <span className={getCellClass()}
              onClick={openCell} onContextMenu={labelCell}>
            {renderCellContent()}
        </span>
    );
};

const mapStateToProps = (state: IState) => ({
    board: state.board,
    isGameEnded: state.isGameEnded
});

const mapDispatchToProps = {
    openCell: createOpenCell,
    labelCell: createLabelCell
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
