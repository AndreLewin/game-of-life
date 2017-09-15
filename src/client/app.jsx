/* All components are here. If there are too many,
put each one in a component/container file then import them */

// connect is a function of react-redux
// that helps create a smart component (container) based on a component
// the first argument is a callback, input = the Redux state, output = props based of the state
// the second argument is a callback, input = the function dispatch from the store,
//     output = props that can dispatch an action upon call (that's how we give handlers)

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


const MessageCom = ({ running }) => (
    <p>{running ? 'The game is running' : 'The game is not running'}</p>
);
const MessageCn = connect(
    state => ({
        running: state.get('running'),
    })
)(MessageCom);


const ButtonsCom = ({ running, handlePlayClick, handlePauseClick, handleClearClick, handleRandomiseClick, handleNextGeneration }) => (
    <div>
        <Button positive={!running} icon='play' content='Play' onClick={handleNextGeneration} />
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


const Square = ({alive, row, column, handleSquareClick}) => {
    return (
        <td
            className={alive ? "alive" : "dead"}
            onClick={() => handleSquareClick({i:row, j:column})}
        > </td>
    );
};
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
            <MessageCn/>
            <ButtonsCn/>
        </div>
        <BoardCn />
    </div>
);

export default App;