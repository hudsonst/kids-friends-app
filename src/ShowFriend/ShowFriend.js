import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../config'
import KidsContext from '../KidsContext'


class ShowFriend extends Component {
    static contextType = KidsContext;

    deleteFriend(friend, cd) {
        fetch(`${config.API_ENDPOINT}/api/friends/${friend.id}`, {
          method: 'DELETE'
        })
          .then(res => {
            if (!res.ok) {
              return res.json().then(error => {
                throw error
              })
            }
          })
          .then(data => {
            cd(friend)
          })
          .catch(error => {
            console.error(error)
          })
      }

    handleClickBack = () => {
        this.props.history.push('/Home')
    };

    render() {

        function siblingsList(friend) {
            if (!friend.siblings) { return }
            const siblingArr = friend.siblings.map((sibling) => {
                return (
                    <li key={`${sibling.id}`}>{sibling.name}</li>)
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
                    <h3 className="details"> Details</h3>
                   <p className="details">Parent: {friend.pfirst_name}{' '}{friend.plast_name}<br />
                    Age: {friend.age}<br />
                    Birthday: {friend.birthday}<br />
                    Sibling(s): <ul className="siblingList">{siblings}</ul>
                    Allergies: {friend.allergies}<br />
                    Age: {friend.age}<br />
                    Notes: {friend.notes}<br /><br /></p>
                    <div className='buttons center'>
                    <Link to={{pathname: `/editFriend/${friend.id}`, state: {kid: kid, friend: friend}}}><button>Edit</button></Link>
                    <button onClick={this.handleClickBack}>Back</button><br />
                    <Link to='/Home'><button onClick={() => {this.deleteFriend(friend, this.context.deleteFriend)}}>Remove {friend.first_name}</button></Link>
                    </div>
                </section>

            </main>

        )

    }
}
export default ShowFriend