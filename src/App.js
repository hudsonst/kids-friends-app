import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Nav from './Nav/Nav'
import Footer from './Footer/Footer'
import Home from './Home/Home'
import KidsContext from './KidsContext'
import Landing from './Landing/Landing'
import ShowFriend from './ShowFriend/ShowFriend'
import AddFriend from './AddFriend/AddFriend'
import ShowKid from './ShowKid/ShowKid'
import AddKid from './AddKid/AddKid'
import EditKid from './EditKid/EditKid'
import EditFriend from './EditFriend/EditFriend'
import Contact from './Contact/Contact'
import About from './About/About'
import './App.css'

class App extends Component {

  state = {
    kids: this.props.store.kids,
    friends: this.props.store.friends,
    error: null,
  };

  addKid = kid => {
    this.setState({
      kids: [...this.state.kids, kid],
    })
  }

  deleteKid = kid => {
    const { kids } = this.state
    const currentKid = kids.find(ckid => ckid.id === kid.id)
    const newKids = kids.filter(kid => currentKid !== kid)
    this.setState({
      kids: [...newKids],
    })
  }

  deleteFriend = friend => {
    const { kids, friends } = this.state
    const currentfriend = friends.find(cfriend => cfriend.id === friend.id)
    const newFriends = friends.filter(friend => currentfriend !== friend)

    //Also need to remove friend from Kids array
    let finalKidsArr = [...kids]
    kids.forEach(kid => {
      const friendArr = kid.friends.filter(ofriend => ofriend !== friend.id)
      if (JSON.stringify(friendArr) !== JSON.stringify(kid.friends)) {
        const newKid = { ...kid, friends: friendArr }
        //remove old version of kid from array. 
        //Use finalKidsArr as a mutable copy of the kids array
        const newKids = finalKidsArr.filter(kid => kid.id !== newKid.id)
        finalKidsArr = [...newKids, newKid]
      }
    }
    )

    this.setState({
      kids: [...finalKidsArr],
      friends: [...newFriends]
    })
  }

  addFriend = (friend, kid) => {
    const { kids, friends } = this.state
    const currentKid = kids.find(ckid => ckid.id === kid.id)
    const newKids = kids.filter(kid => currentKid !== kid)
    const newFriendsArr = currentKid.friends.concat(friend.id)
    const updatedKid = { ...currentKid, friends: newFriendsArr }
    this.setState({
      kids: [...newKids, updatedKid],
      friends: [friend, ...friends],
    })
  }

  editKid = (updatedKid, kid_id) => {
    kid_id = Number(kid_id);

    const newKids = this.state.kids.filter(kid =>
      kid.id !== kid_id
    )
    console.log(newKids)
    this.setState({
      kids: [...newKids, updatedKid],
    })

  }

  editFriend = (updatedFriend, friend_id) => {
    friend_id = Number(friend_id);

    const newFriends = this.state.friends.filter(friend =>
      friend.id !== friend_id
    )
    console.log(newFriends)
    this.setState({
      friends: [...newFriends, updatedFriend],
    })

  }

  render() {

    const contextValue = {
      kids: this.state.kids,
      friends: this.state.friends,
      addKid: this.addKid,
      addFriend: this.addFriend,
      deleteKid: this.deleteKid,
      deleteFriend: this.deleteFriend,
      editKid: this.editKid,
      editFriend: this.editFriend,
    }
    return (
      <KidsContext.Provider value={contextValue}>
        <main className='App'>
          <Nav />
          <Route
            exact
            path="/"
            render={(props) => <Landing {...props} />}
          />

          <Route
            path="/SignUp"
            render={(props) => <Landing {...props} />}
          />
          <Route
            path="/Contact"
            render={(props) => <Contact />}
          />

          <Route
            path="/About"
            render={(props) => <About />}
          />
          <Route
            path="/Home"
            render={(props) => <Home />}
          />

          <Route
            path="/kid/:id"
            component={ShowKid}
          />
          <Route
            path="/friend/:id"
            component={ShowFriend}
          />
          <Route
            path="/editKid/:id"
            component={EditKid}
          />
          <Route
            path="/editFriend/:id"
            component={EditFriend}
          />
          <Route
            path="/addKid"
            component={AddKid}
          />
          <Route
            path="/addFriend"
            component={AddFriend}
          />
          <Footer />
        </main>
      </KidsContext.Provider>
    );
  }
}


export default App;
