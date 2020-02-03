import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import KidsContext from '../KidsContext'
//import './AddKid.css'

class ShowKid extends Component {
    static contextType = KidsContext;

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
                    <h3>Details</h3>

                    Age: {kid.age}<br />
                    Birthday: {kid.birthday}<br />
                    Allergies: {kid.allergies}<br />
                    Notes: {kid.notes}<br /><br />

                    Friends: {friendsList}

                    <Link to={{ pathname: `/addFriend`, state: { kid: kid } }}><button>Add Friend</button></Link>
                    <Link to={{pathname: `/editKid/${kid.id}`, state: {kid: kid}}}><button>Edit</button></Link>
                    <button onClick={this.handleClickBack}>Back</button>
                    <Link to='/Home'><button onClick={() => this.context.deleteKid(kid)}>Remove {kid.first_name}</button></Link>
                </section>

            </main>

        )
    }
}
export default ShowKid