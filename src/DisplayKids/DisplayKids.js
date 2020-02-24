import React from 'react'
import { Link } from 'react-router-dom'
import './DisplayKids.css'


export default function DisplayKids(props) {

    const { kid, friends } = props;

    function friendsfunc(kid) {

        const friendArr = kid.friends.map(friend_id => {
            
            let currentFriend = friends.find(friend => friend.id === friend_id)
            if (currentFriend) {
            return (
                <Link to={{ pathname: `/friend/${friend_id}`, state: { kid: kid, friend: currentFriend } }} key={friend_id}>{currentFriend.first_name}</Link>

            )} else {
                return ('')
            }
        }
        )
        return friendArr;

    }

    const friendsList = friendsfunc(kid)


    return (

        <li>
            <h2><Link to={{ pathname: `/kid/${kid.id}`, state: {kid: kid, friends: friends} }}>{kid.first_name}{' '}{kid.last_name}</Link></h2>
            <Link to={{pathname: '/addFriend', state: {kid: kid}}}><button>Add Friend</button></Link>
            <p>Friends:
                {friendsList}
            </p>

        </li>)

}
