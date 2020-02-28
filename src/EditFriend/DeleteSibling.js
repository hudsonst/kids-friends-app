import React from 'react'
import { Link } from 'react-router-dom'
import KidsContext from '../KidsContext'
import config from '../config'


function deleteSibling(sibling, kid, friend, cb, history) {
    fetch(`${config.API_ENDPOINT}/api/friends/siblings/${sibling.id}`, {
        method: 'DELETE',
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
        })
        .then(data => {
            cb(sibling, friend)
        })
        .catch(error => {
          console.error(error)
        })
}

export default function DeleteSibling(props) {
const {sibling, kid, friend, history } = props
return (
    <KidsContext.Consumer>
      {(context) => (
        <Link to={{pathname: `/friend/${friend.id}`, state: {kid: kid, friend: friend}}}><button 
className='sibling'
onClick={() => deleteSibling(sibling, kid, friend, context.deleteSibling, history )}>
Delete
</button>
</Link>
)}
    </KidsContext.Consumer>
  )
}

DeleteSibling.defaultProps = {
  onClickDelete: () => {},
}