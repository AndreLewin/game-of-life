/* All components are here. If there are too many,
put each one in a component/container file then import them */

// connect is a function of react-redux
// that helps create a smart component (container) based on a component
// the first argument is a callback, input = the Redux state, output = props based of the state
// the second argument is a callback, input = the function dispatch from the store,
//     output = props that can dispatch an action upon call (that's how we give handlers)

import React from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Button, Divider, Grid } from 'semantic-ui-react';

import '../../public/style/style.scss';
import { APP_NAME } from '../shared/config';
import { sayHelloAC } from './index';


const MessageCom = ({ message }) => (
    <p>{message}</p>
);

const MessageCn = connect(
    state => ({
        message: state.get('message'),
    })
)(MessageCom);


const ButtonCom = ({ label, handleClick }) => (
    <Button onClick={handleClick}>{label}</Button>
);

const ButtonCn = connect(
    state => ({
        label: 'Say hello',
    }),
    dispatch => ({
        handleClick: () => { dispatch(sayHelloAC('Hello!')) },
    })
)(ButtonCom);


const colors = [
    'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue',
    'violet', 'purple', 'pink', 'brown', 'grey', 'black',
];

const App = () => (
    <div id="my-wrapper">
        <div className='container'>
            <Header as="h1" className='override'>{APP_NAME}</Header>
            <MessageCn />
            <div>
                <ButtonCn />
                <Button icon='play' content='Play' />
                <Button icon='pause' content='Pause' />
                <Button icon='bomb' content='Clear' />
                <Button icon='shuffle' content='Shuffle' />
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