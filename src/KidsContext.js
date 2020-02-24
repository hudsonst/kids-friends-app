import React from 'react'

const KidsContext = React.createContext({
  kids: [],
  friends: [],
  store: [],
  addKid: () => {},
  addFriend: () => {},
  deleteKid: () => {},
  deleteFriend: () => {},
  deleteSibling: () => {},
  editKid: () => {},
  editFriend: () => {},
})

export default KidsContext