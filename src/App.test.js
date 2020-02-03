import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import STORE from './dummy-store';
import App from './App';


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <App store={STORE} />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})