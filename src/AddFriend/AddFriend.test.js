import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AddFriend from './AddFriend'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <AddFriend />
        </BrowserRouter>,
        div);
    ReactDOM.unmountComponentAtNode(div);
});