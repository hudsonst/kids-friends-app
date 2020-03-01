import React, { Component } from 'react'
import KidsContext from '../KidsContext'
import ValidationError from '../ValidationError'
import config from '../config'

class AddFriend extends Component {
    static contextType = KidsContext;

    state = {
        error: null,
        first_name: {
            value: '',
            touched: false
        },
        last_name: '',
        age: {
            value: '',
            touched: false
        },
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

    updateAge(age) {
        this.setState({
            age: { value: age },
            touched: true
        });
    }

    validateName() {
        const name = this.state.first_name.value.trim();
        if (name.length === 0) {
            return 'First Name is required';
        }
    }

    validateAge() {
        const age = this.state.age.value.trim();
        if (age.length === 0) {
            return 'Age is required';
        }
    }

    handleSubmit = e => {
        e.preventDefault()

        const { kid } = this.props.location.state
        let siblings = e.target.siblings.value
        const { first_name, last_name, pfirst_name, plast_name, age, birthday, allergies, notes } = e.target
        if (siblings) { siblings = siblings.split(', ') }

        const friend = {
            first_name: first_name.value,
            last_name: last_name.value,
            pfirst_name: pfirst_name.value,
            plast_name: plast_name.value,
            siblings,
            age: age.value,
            birthday: birthday.value,
            allergies: allergies.value,
            notes: notes.value,
            kidId: kid.id
        }

        this.setState({ error: null })

        fetch(`${config.API_ENDPOINT}/api/friends`, {
            method: 'POST',
            body: JSON.stringify(friend),
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
                friend.id = data.id
                this.context.addFriend(friend, kid)
                this.props.history.push('/Home')
            })
            .catch(error => {
                this.setState({ error })
            })
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
                    <label htmlFor="first_name">First Name</label>
                    <input placeholder='First Name' type="text" name='first_name'
                        id='first_name' className="firstName" required onChange={e => this.updateName(e.target.value)} />
                    {!this.state.first_name.touched && (
                        <ValidationError message={this.validateName()} />
                    )}

                    <label htmlFor="last_name" className="lastName">Last Name</label>
                    <input type="text" name='last_name' id='last_name' placeholder='Last Name' />

                    <label htmlFor="age">Age</label>
                    <input type="number" name='age' id='age' required onChange={e => this.updateAge(e.target.value)} />
                    {!this.state.age.touched && (
                        <ValidationError message={this.validateAge()} />
                    )}

                    <label htmlFor="pfirst_name">Parent's First name</label>
                    <input type="text" name='pfirst_name' id='pfirst_name' />
                    <label htmlFor="plast_name">Parent's Last name</label>
                    <input type="text" name='plast_name' id='plast_name' />


                    <label htmlFor="siblings">Siblings (seperated by commas)</label>
                    <input type="text" name='siblings' id='siblings' />

                    <label htmlFor="birthday">Birthday</label>
                    <input type="text" placeholder="mm/dd" name='birthday' id='birthday' />

                    <label htmlFor="allergies">Allergies</label>
                    <textarea rows="5" name='allergies' id='allergies' />

                    <label htmlFor="notes">Notes</label>
                    <textarea rows="5" name='notes' id='notes' /><br /><br />
                    <div className="buttons center">
                        <button type='submit'>Add Friend</button>
                        <button onClick={this.handleClickCancel}>Cancel</button>
                    </div>
                </form>
            </section>
        )

    }
}

export default AddFriend;