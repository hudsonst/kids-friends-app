import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer(props) {

    return (
        <footer><Link to={'/Contact'}>Contact</Link> | <Link to={'/About'}>About</Link></footer>
    )
}