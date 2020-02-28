import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import KidsContext from '../KidsContext'
import config from '../config'
//import './AddKid.css'

class ShowKid extends Component {
    static contextType = KidsContext;

    deleteKid(kid, cd) {
        fetch(`${config.API_ENDPOINT}/api/kids/${kid.id}`, {
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
            cd(kid)
          })
          .catch(error => {
            console.error(error)
          })
      }

    handleClickBack = () => {
        this.props.history.push('/Home')
    };

    render() {

        function friendsfunc(kid) {
            const friendArr = kid.friends.map(friend_id => {
                let currentFriend = friends.find(friend => friend.id === friend_id)
                return (
                    <Link to={{ pathname: `/friend/${friend_id}`, state: { kid: kid, friend: currentFriend } }} key={friend_id}>{currentFriend.first_name}</Link>
    
                )
            }
            )
            return friendArr;
        }

        const { kid, friends } = this.props.location.state;
        const friendsList = friendsfunc(kid)


        return (
            <main className="showKid">

                <header role="banner">
                    <h1>{kid.first_name}{' '}{kid.last_name}</h1>
                </header>


                <section>
                    <h3 className="details">Details</h3>

                    <p className="details">Age: {kid.age}<br />
                    Birthday: {kid.birthday}<br />
                    Allergies: {kid.allergies}<br />
                    Notes: {kid.notes}<br /><br />

                    Friends: {friendsList}</p>
                    <div className='buttons center'>
                    <Link to={{ pathname: `/addFriend`, state: { kid: kid } }}><button className='add_friend'>Add Friend</button></Link><br />
                    <Link to={{pathname: `/editKid/${kid.id}`, state: {kid: kid}}}><button>Edit</button></Link>
                    <button onClick={this.handleClickBack}>Back</button><br />
                    <Link to='/Home'><button onClick={() => {this.deleteKid(kid, this.context.deleteKid)}}>Remove {kid.first_name}</button></Link>
                    </div>
                </section>
            </main>

        )
    }
}
export default ShowKid