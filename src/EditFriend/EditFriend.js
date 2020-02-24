import React, { Component } from 'react';
import ValidationError from '../ValidationError'
import KidsContext from '../KidsContext';

class EditFriend extends Component {
    static contextType = KidsContext;

    state = {
        error: null,
        id: '',
        first_name: {
            value: '',
            touched: false,
        },
        last_name: '',
        pfirst_name: '',
        plast_name: '',
        siblings: '',
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
        const { first_name, last_name, pfirst_name, plast_name, age, birthday, allergies, notes } = e.target
        let siblings = e.target.siblings.value
        if (siblings) { siblings = siblings.split(', ') }
        const { kid, friend } = this.props.location.state
        const updatedFriend = {
            id: friend.id,
            first_name: first_name.value,
            last_name: last_name.value,
            pfirst_name: pfirst_name.value,
            plast_name: plast_name.value,
            age: age.value,
            siblings,
            birthday: birthday.value,
            allergies: allergies.value,
            notes: notes.value,
            friends: friend.friends,
        }
        this.context.editFriend(updatedFriend)
        this.props.history.push({
            pathname: `/friend/${friend.id}`,
            state: { kid: kid, friend: updatedFriend }
        })
            })
    }


    handleSibling = e => {
        e.preventDefault()
        const { newSiblings } = e.target
        const { kid, friend } = this.props.location.state

        const newSiblingsArr = newSiblings.value.split(",")
        const siblingArr = newSiblingsArr.map(sib => { return { name: sib } })
        siblingArr.forEach(newSibling => {
            fetch(`${config.API_ENDPOINT}/api/friends/siblings/${friend.id}`, {
                method: 'POST',
                body: JSON.stringify(newSibling),
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
                    console.log(data)
                    friend.siblings = [...this.state.siblings, data[0]]
                }).then(data => {
                    console.log(friend.siblings)
                    this.props.history.push({
                        pathname: `/friend/${friend.id}`,
                        state: { kid: kid, friend: friend }
                    })
                })
        })
    }

   function deleteSibling(e, cd) {
        debugger
        const {sibling} = e.target
        const {kid, friend} = this.props.location.state

        fetch(`${config.API_ENDPOINT}/api/friends/siblings/${sibling.id}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
    }

    handleClickCancel = () => {
        this.props.history.push('/Home')
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        const { friend } = this.props.location.state
        this.setState(
            {
                id: friend.id,
                first_name: { value: friend.first_name },
                last_name: friend.last_name,
                pfirst_name: friend.pfirst_name,
                plast_name: friend.plast_name,
                siblings: friend.siblings,
                age: friend.age,
                birthday: friend.birthday,
                allergies: friend.allergies,
                notes: friend.notes,
            })

    }


    render() {
        const { first_name, last_name, pfirst_name, plast_name, age, siblings, birthday, allergies, notes } = this.state
        return (
            <section className='EditFriend'>
                <header role="banner">
                    <h1>Edit Friend</h1>
                </header>

                <form className='edit-friend-form' onSubmit={this.handleSubmit}>

                    <label htmlFor="first_name">First name</label>
                    <input type="text" value={first_name.value} name='first_name'
                        id='first_name' required onChange={e => this.updateName(e.target.value)} />
                    {!this.state.first_name.touched && (
                        <ValidationError message={this.validateName()} />
                    )}
                    <label htmlFor="last_name">Last name</label>
                    <input type="text" value={last_name} name='last_name' id='last_name' onChange={this.handleChange} />

                    <label htmlFor="pfirst_name">Parent First name</label>
                    <input type="text" value={pfirst_name} name='pfirst_name' id='pfirst_name' onChange={this.handleChange} />

                    <label htmlFor="plast_name">Parent Last name</label>
                    <input type="text" value={plast_name} name='plast_name' id='plast_name' onChange={this.handleChange} />

                    <label htmlFor="age">Age</label>
                    <input type="number" value={age} name='age' id='age' onChange={this.handleChange} />

                    <label htmlFor="siblings">Siblings (seperated by commas)</label>
                    <input type="text" value={siblings} name='siblings' id='siblings' onChange={this.handleChange} />

                    <label htmlFor="birthday">Birthday</label>
                    <input type="text" value={birthday} placeholder="mm/dd" name='birthday' id='birthday' onChange={this.handleChange} />

                    <label htmlFor="allergies">Allergies</label>
                    <textarea rows="2" value={allergies} cols="50" name='allergies' id='allergies' onChange={this.handleChange} />

                    <label htmlFor="notes">Notes</label>
                    <textarea rows="2" value={notes} cols="50" name='notes' id='notes' onChange={this.handleChange} />

                    <button onClick={this.handleClickCancel}>Cancel</button>
                    <button type='submit'>Update Friend</button>

                </form>
            </section>
        )

    }
}

export default EditFriend;