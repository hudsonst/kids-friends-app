import React, { Component } from 'react';
import ValidationError from '../ValidationError'
import KidsContext from '../KidsContext';
import config from '../config'

class EditKid extends Component {
    static contextType = KidsContext;

    state = {
        error: null,
        id: '',
        first_name: {
            value: '',
            touched: false,
        },
        last_name: '',
        age: '',
        birthday: '',
        allergies: '',
        notes: '',
    };

    updateName(first_name) {
        this.setState({
            first_name: {
                value: first_name,
                touched: true
            }
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
        const { kid } = this.props.location.state
        const updatedKid = {
            id: kid.id,
            first_name: first_name.value,
            last_name: last_name.value,
            age: age.value,
            birthday: birthday.value,
            allergies: allergies.value,
            notes: notes.value,
            friends: kid.friends,
        }

        fetch(`${config.API_ENDPOINT}/api/kids/${kid.id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedKid),
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
            })
            .then(data => {

                this.context.editKid(updatedKid)
                this.props.history.push('/Home')
            })
    }


    handleClickCancel = () => {
        this.props.history.push('/Home')
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        const { kid } = this.props.location.state

        this.setState(
            {
                id: kid.id,
                first_name: { value: kid.first_name },
                last_name: kid.last_name,
                age: kid.age,
                birthday: kid.birthday,
                allergies: kid.allergies,
                notes: kid.notes,
                friends: kid.friends,
            })

    }


    render() {
        const { first_name, last_name, age, birthday, allergies, notes } = this.state
        return (
            <section className='EditKid'>
                <header role="banner">
                    <h1>Edit Kid</h1>
                </header>

                <form className='edit-kid-form' onSubmit={this.handleSubmit}>
                    <label htmlFor="first_name">First name</label>
                    <input type="text" value={first_name.value} name='first_name'
                        id='first_name' required onChange={e => this.updateName(e.target.value)} />
                    {!this.state.first_name.touched && (
                        <ValidationError message={this.validateName()} />
                    )}
                    <label htmlFor="last_name">Last name</label>
                    <input type="text" value={last_name} name='last_name' id='last_name' placeholder='Last Name' onChange={this.handleChange} />

                    <label htmlFor="age">Age</label>
                    <input type="number" value={age} name='age' id='age' required onChange={this.handleChange} />

                    <label htmlFor="birthday">Birthday</label>
                    <input type="text" value={birthday} placeholder="mm/dd" name='birthday' id='birthday' onChange={this.handleChange} />

                    <label htmlFor="allergies">Allergies</label>
                    <textarea rows="2" value={allergies} cols="50" name='allergies' id='allergies' onChange={this.handleChange} />

                    <label htmlFor="notes">Notes</label>
                    <textarea rows="2" value={notes} cols="50" name='notes' id='notes' onChange={this.handleChange} />

                    <div className='buttons center'>
                        <button onClick={this.handleClickCancel}>Cancel</button>
                        <button type='submit'>Update Kid</button>
                    </div>

                </form>
            </section>
        )

    }
}

export default EditKid;