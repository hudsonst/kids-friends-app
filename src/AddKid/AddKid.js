import React, { Component } from 'react';
import KidsContext from '../KidsContext'
import ValidationError from '../ValidationError'
import './AddKid.css'
import config from '../config';

class AddKid extends Component {
    static contextType = KidsContext;

    state = {
        error: null,
        id: '',
        first_name: {
            value: '',
            touched: false
        },
        last_name: '',
        age: null,
        birthday: '',
        allergies: { value: '' },
        notes: { value: '' },
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
        const { first_name, last_name, age, birthday, allergies, notes } = e.target

        const kid = {
            first_name: first_name.value,
            last_name: last_name.value,
            age: age.value,
            birthday: birthday.value,
            allergies: allergies.value,
            notes: notes.value,
            friends: [],
        }
    this.setState({ error: null })
    fetch(`${config.API_ENDPOINT}/api/kids`, {
      method: 'POST',
      body: JSON.stringify(kid),
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        //id value added by the server
        kid.id = data.id
        this.context.addKid(kid)
        this.props.history.push('/Home')
    }
)
      .catch(error => {
        this.setState({ error })
      })
  }

    handleClickCancel = () => {
        this.props.history.push('/Home')
    };

    render() {


        return (
            <section className='AddKid'>
                <header role="banner">
                    <h1>Add Kid</h1>
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

                    <label htmlFor="age">Age</label>
                    <input type="number" name='age' id='age' />

                    <label htmlFor="birthday">Birthday</label>
                    <input type="text" placeholder="mm/dd" name='birthday' id='birthday' />

                    <label htmlFor="allergies">Allergies</label>
                    <textarea rows="2" cols="50" name='allergies' id='allergies' />

                    <label htmlFor="notes">Notes</label>
                    <textarea rows="2" cols="50" name='notes' id='notes' /><br/><br/>
                    
                    <div className="buttons center">
                    <button type='submit'>Add Kid</button>
                    <button onClick={this.handleClickCancel}>Cancel</button>
                    </div>

                </form>
            </section>
        )

    }
}

export default AddKid;