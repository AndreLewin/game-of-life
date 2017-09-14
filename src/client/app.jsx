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
import { playGameAC, pauseGameAC, clearGridAC, randomiseGridAC } from './index';


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


const ButtonsCom = ({ running, handlePlayClick, handlePauseClick, handleClearClick, handleRandomiseClick }) => (
    <div>
        <Button icon='play' content='Play' onClick={handlePlayClick} />
        <Button icon='pause' content='Pause' onClick={handlePauseClick} />
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
    })
)(ButtonsCom);


const Square = ({alive}) => {
    return (
        <td className={alive ? "alive" : "dead"}> </td>
    );
};
const BoardCom = ({ grid }) => {
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
        <Divider/>
        <BoardCn />
    </div>
);

export default App;