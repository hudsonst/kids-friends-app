import React from 'react'
import { Link } from 'react-router-dom'
import KidsContext from '../KidsContext'
import DisplayKids from '../DisplayKids/DisplayKids'


export default function Home(props) {

    return (

        <KidsContext.Consumer>

            {(context) => (
                <>
                    <header role="banner">
                        <h1>Your Kids</h1>
                        <Link to='/AddKid'>
                            <button>Add Kid</button>
                        </Link>
                    </header>
                    <section className='displayKids'>

                        <ul className='kids'>
                            {context.kids.map(kid => (
                                <DisplayKids
                                    key={kid.id}
                                    kid={kid}
                                    friends={context.friends}
                                />
                        )
                            )}
                        </ul>
              
                    </section>
                </>)}
        </KidsContext.Consumer>
    )
}