import React from 'react';
import { connect } from 'react-redux';
import { Icon, Segment, Header, Button, Divider, Grid, Table } from 'semantic-ui-react';

import '../../public/style/style.scss';
import { APP_NAME } from '../shared/config';
import { playGameAC, pauseGameAC, clearGridAC, randomiseGridAC, switchStateAC, nextGenerationAC } from './index';


const GenerationCounterCom = ({ generation }) => (
    <Header.Subheader>
        Generation: {generation}
    </Header.Subheader>
);
const GenerationCounterCn = connect(
    state => ({
        generation: state.get('generation'),
    })
)(GenerationCounterCom);


const ButtonsCom = ({ running, handlePlayClick, handlePauseClick, handleClearClick, handleRandomiseClick, handleNextGeneration }) => (
    <div>
        <Button positive={!running} icon='play' content='Play' onClick={handlePlayClick} />
        <Button negative={running} icon='pause' content='Pause' onClick={handlePauseClick} />
        <Button icon='bomb' content='Clear' onClick={handleClearClick} />
        <Button icon='shuffle' content='Randomise' onClick={handleRandomiseClick} />
    </div>
);
const ButtonsCn = connect(
    state => ({
        running: state.get('running'),
    }),
    dispatch => ({
        handlePlayClick: () => { dispatch(playGameAC()) },
        handlePauseClick: () => { dispatch(pauseGameAC()) },
        handleClearClick: () => { dispatch(clearGridAC()) },
        handleRandomiseClick: () => { dispatch(randomiseGridAC()) },
        handleNextGeneration: () => { dispatch(nextGenerationAC()) }
    })
)(ButtonsCom);

/*
// It is concise, it works, but it is bad practice to create a function in the render
// https://daveceddia.com/avoid-bind-when-passing-props/
const Square = ({alive, row, column, handleSquareClick}) => {
    return (
        <td
            className={alive ? "alive" : "dead"}
            onClick={() => handleSquareClick({i:row, j:column})}
        > </td>
    );
};
*/
/*
// This solution does not work, you will be stuck in a loop of errors
// https://stackoverflow.com/questions/37387351/reactjs-warning-setstate-cannot-update-during-an-existing-state-transiti
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(object) {
        this.props.handleSquareClick(object)
    }

    render() {
        return (
            <td
                className={this.props.alive ? "alive" : "dead"}
                onClick={this.handleClick({i:this.props.row, j:this.props.column})}
            > </td>
        );
    }
}
*/
// This will work, remember to give onClick the function you binded, so it is called on click
// If you give arguments in the "onClick", you call the function immediately at rendering!
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(object) {
        this.props.handleSquareClick({i:this.props.row, j:this.props.column})
    }

    render() {
        return (
            <td
                className={this.props.alive ? "alive" : "dead"}
                onClick={this.handleClick}
            > </td>
        );
    }
}
const BoardCom = ({ grid, handleSquareClick }) => {
    return (
        <div className='Board'>
            <table>
                <tbody>
                    {grid.map((row, i) => (
                        <tr key={i}>
                            {row.map((square, j) => (
                                <Square
                                    alive={square}
                                    key={j}
                                    row={i}
                                    column={j}
                                    handleSquareClick={handleSquareClick}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
const BoardCn = connect(
    state => ({
        grid: state.get('grid'),
    }),
    dispatch => ({
        handleSquareClick: (payload) => { dispatch(switchStateAC(payload)) }
    })
)(BoardCom);


// Dispatch the grid each half-second when the game is running
class TimerCom extends React.Component {
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            500
        );
    };

    componentWillUnmount() {
        clearInterval(this.timerID);
    };

    tick() {
        if(this.props.running){
            this.props.handleTick();
        }
    };

    render() {
        return (null);
    };
}
const TimerCn = connect(
    state => ({
        running: state.get('running'),
    }),
    dispatch => ({
        handleTick: (payload) => { dispatch(nextGenerationAC()) }
    })
)(TimerCom);


const App = () => (
    <div id="my-wrapper">
        <div className='container'>
            <Header as='h2'>
                <Icon name='tree' />
                <Header.Content>
                    {APP_NAME}
                    <Header.Subheader>
                        <GenerationCounterCn />
                    </Header.Subheader>
                </Header.Content>
            </Header>
            <ButtonsCn/>
        </div>
        <BoardCn />
        <TimerCn />
    </div>
);

export default App;