import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import KidsContext from '../KidsContext'


class ShowFriend extends Component {
    static contextType = KidsContext;

    handleClickBack = () => {
        this.props.history.push('/Home')
    };


    render() {

        function siblingsList(friend) {
            if (!friend.siblings) { return }
            const siblingArr = friend.siblings.map((sibling, i) => {
                const genKey = 'sibNum'
                return (
                    <li key={`${genKey}${i}`}>{sibling}</li>)
            })

            return siblingArr
        }


        const { kid, friend } = this.props.location.state;
        const siblings = siblingsList(friend)

        return (
            <main className="showFriend">

                <header role="banner">
                    <h1>{friend.first_name}{' '}{friend.last_name}</h1>
                    <h3>Friend of {kid.first_name}{' '}{kid.last_name}</h3>
                </header>


                <section>
                    <h3>Details</h3>
                    Parent: {friend.pfirst_name}{' '}{friend.plast_name}<br />
                    Parent Email: {friend.pEmail}<br />
                    Age: {friend.age}<br />
                    Birthday: {friend.birthday}<br />
                    Sibling(s): <ul>{siblings}</ul>
                    Allergies: {friend.allergies}<br />
                    Notes: {friend.notes}<br /><br />

                    <Link to={{pathname: `/editFriend/${friend.id}`, state: {kid: kid, friend: friend}}}><button>Edit</button></Link>
                    <button onClick={this.handleClickBack}>Back</button>
                    <Link to='/Home'><button onClick={() => this.context.deleteFriend(friend)}>Remove {friend.first_name}</button></Link>
                </section>

            </main>

        )

    }
}
export default ShowFriend