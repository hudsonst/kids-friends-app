import React, { Component } from 'react';
import KidsContext from '../KidsContext'
import ValidationError from '../ValidationError'
//import './AddFriend.css'

class AddFriend extends Component {
    static contextType = KidsContext;

    state = {
        error: null,
        first_name: {
            value: '',
            touched: false
        },
        last_name: '',
        age: '',
        birthday: '',
        allergies: '',
        notes: '',
    };

    updateName(first_name) {
        this.setState({
            first_name: { value: first_name },
            touched: true
        });
    }

    validateName() {
        const name = this.state.first_name.value.trim();
        if (name.length === 0) {
            return 'First Name is required';
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        // get the form fields from the event
        
        const {kid} = this.props.location.state
        let siblings = e.target.siblings.value
        const { first_name, last_name, pfirst_name, plast_name, age, birthday, allergies, notes } = e.target
        if (siblings) 
        { siblings = siblings.split(', ')}
        const id = Math.random().toString(36).substring(2, 4)
        + Math.random().toString(36).substring(2, 4);
        const friend = {
            id,
            first_name: first_name.value,
            last_name: last_name.value,
            pfirst_name: pfirst_name.value,
            plast_name: plast_name.value,
            siblings,
            age: age.value,
            birthday: birthday.value,
            allergies: allergies.value,
            notes: notes.value,
        }

        this.context.addFriend(friend, kid)
        this.props.history.push('/Home')
    }

    handleClickCancel = () => {
        this.props.history.push('/Home')
    };

    render() {


        return (
            <section className='AddFriend'>
                <header role="banner">
                    <h1>Add Friend</h1>
                </header>

                <form className='add-kid-form' onSubmit={this.handleSubmit}>
                    <label htmlFor="first_name">First name</label>
                    <input placeholder='First Name' type="text" name='first_name'
                        id='first_name' required onChange={e => this.updateName(e.target.value)} />
                    {!this.state.first_name.touched && (
                        <ValidationError message={this.validateName()} />
                    )}

                    <label htmlFor="last_name">Last name</label>
                    <input type="text" name='last_name' id='last_name' placeholder='Last Name' />
                    <label htmlFor="pfirst_name">Parent's First name</label>
                    <input type="text" name='pfirst_name' id='pfirst_name' />
                    <label htmlFor="plast_name">Parent's Last name</label>
                    <input type="text" name='plast_name' id='plast_name' />

                    <label htmlFor="age">Age</label>
                    <input type="number" name='age' id='age' />

                    <label htmlFor="siblings">Siblings (seperated by commas)</label>
                    <input type="text" name='siblings' id='siblings' />

                    <label htmlFor="birthday">Birthday</label>
                    <input type="text" placeholder="mm/dd" name='birthday' id='birthday' />

                    <label htmlFor="allergies">Allergies</label>
                    <textarea rows="2" cols="50" name='allergies' id='allergies' />

                    <label htmlFor="notes">Notes</label>
                    <textarea rows="2" cols="50" name='notes' id='notes' />

                    <button onClick={this.handleClickCancel}>Cancel</button>
                    <button type='submit'>Add Friend</button>

                </form>
            </section>
        )

    }
}

export default AddFriend;