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

import config from './config';

class App extends Component {

  state = {
    kids: [],
    friends: [],
    error: null,
  };

  addKid = kid => {
    this.setState({
      kids: [...this.state.kids, kid],
    })
  }

  deleteKid = kid => {
    const { kids } = this.state
    const newKids = kids.filter(ckid => ckid !== kid)
    this.setState({
      kids: newKids
    })
  }

  deleteSibling = (sibling, friend) => {
    const { friends } = this.state
    const newSibs = friend.siblings.filter(sib => sib.id !== sibling.id)
    friend.siblings = newSibs
    const outFriends = friends.filter(cfriend => cfriend.id !== friend.id)
    this.setState({
      friends: [...outFriends, friend]
    })
  }

  deleteFriend = friend => {
    const { kids, friends } = this.state

    const newFriends = friends.filter(cfriend => cfriend !== friend)

    //Also need to remove friend from Kids array

    kids.forEach(kid => {
      kid.friends = kid.friends.filter(cfriend => cfriend !== friend.id)
    }
    )

    this.setState({
      kids,
      friends: [...newFriends]
    })
  }

  addFriend = (friend, kid) => {
    const { kids, friends } = this.state
    const kidsArray = kids.map(ckid => {
      if (ckid.id === kid.id) {
        ckid.friends = ckid.friends.concat(friend.id)
      }
      return ckid
    })

    this.setState({
      kids: kidsArray,
      friends: [friend, ...friends],
    })
  }

  editKid = (updatedKid) => {

    const newKids = this.state.kids.map(ckid => {
      if (ckid.id === updatedKid.id) {
        ckid = updatedKid
      }
      return ckid
    })


    this.setState({
      kids: newKids
    })

  }

  editFriend = (updatedFriend) => {

    const newFriends = this.state.friends.map(cfriend => {
      if (cfriend.id === updatedFriend.id) {
        cfriend = updatedFriend
      }
      return cfriend
    }
    )
    this.setState({
      friends: newFriends
    })

  }


  componentDidMount() {

    fetch(`${config.API_ENDPOINT}/api/kids/Home`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong fetching Home page');
        }
        return response
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ kids: data })
      })

    fetch(`${config.API_ENDPOINT}/api/friends`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong fetching friends');
        }
        return response
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ friends: data })
      })
  }


  render() {

    const contextValue = {
      kids: this.state.kids,
      friends: this.state.friends,
      addKid: this.addKid,
      addFriend: this.addFriend,
      deleteKid: this.deleteKid,
      deleteSibling: this.deleteSibling,
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
