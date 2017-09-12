/* All components are here. If there are too many,
put each one in a component/container file then import them */

// connect is a function of react-redux
// that helps create a smart component (container) based on a component
// the first argument is a callback, input = the Redux state, output = props based of the state
// the second argument is a callback, input = the function dispatch from the store,
//     output = props that can dispatch an action upon call (that's how we give handlers)

import React from 'react';
import { connect } from 'react-redux';
import { Icon, Segment, Header, Button, Divider, Grid } from 'semantic-ui-react';

import '../../public/style/style.scss';
import { APP_NAME } from '../shared/config';
import { setRunningAC } from './index';


const MessageCom = ({ running }) => (
    <p>{running ? 'The game is running' : 'The game is not running'}</p>
);
const MessageCn = connect(
    state => ({
        running: state.get('running'),
    })
)(MessageCom);


const ButtonCom = ({ label, handleClick }) => (
    <Button onClick={handleClick}>{label}</Button>
);
const ButtonCn = connect(
    state => ({
        label: 'Set Running',
    }),
    dispatch => ({
        handleClick: () => { dispatch(setRunningAC(true)) },
    })
)(ButtonCom);


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



const colors = [
    'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue',
    'violet', 'purple', 'pink', 'brown', 'grey', 'black',
];

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
            <MessageCn />
            <div>
                <ButtonCn />
                <Button icon='play' content='Play' />
                <Button icon='pause' content='Pause' />
                <Button icon='bomb' content='Clear' />
                <Button icon='shuffle' content='Randomise' />
            </div>
        </div>
        <Divider/>
        <div className='container'>
            <Grid columns={5} padded>
                {colors.map(color => (
                    <Grid.Column color={color} key={color}>
                        {color}
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    </div>
);

export default App;