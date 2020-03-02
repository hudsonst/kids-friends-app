import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AddKid from './AddKid'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <AddKid />
        </BrowserRouter>,
        div);
    ReactDOM.unmountComponentAtNode(div);
});