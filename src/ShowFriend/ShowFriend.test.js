import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter, Route } from 'react-router-dom'
import ShowFriend from './ShowFriend'


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter initialEntries={[{pathname: '/kid/1',
       state: {
                kid: {
                    id: 1,
                    first_name: '',
                    last_name: '',
                    age: '',
                    birthday: '',
                    allergies: '',
                    notes: '',
                    friends: []
                },
                friend: {
                    id: 1,
                    first_name: '',
                    last_name: '',
                    age: '',
                    birthday: '',
                    allergies: '',
                    notes: '',
                },
            }
        }
        ]} >
        <Route component={ShowFriend} />
        </MemoryRouter >,
    div);
ReactDOM.unmountComponentAtNode(div);
});