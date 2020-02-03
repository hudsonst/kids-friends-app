import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav(props) {
  return (
    <nav className="Nav">
      <Link to={'/'}>
        Home
        </Link>
      {' '}|{' '}
      <Link to={'/Home'}>
        Demo
        </Link>
    </nav>
  )
}
