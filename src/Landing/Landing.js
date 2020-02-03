import React from 'react'
import { Link } from 'react-router-dom'



export default function Landing(props) {

    return (
        <main>
        <h1>Your Kid's Friends!</h1>
        <section>
            Welcome to Your Kid's Friends - a contacts database for the friends of your kids! 
        </section>
        <section>
          <h3>How It Works</h3>
         <p><Link to="/Home"><button>Demo!</button></Link></p>
        <p>After you sign up, enter each of your children. Then add their friends! Add parents' names, phone numbers, birthdays, siblings, allergy info, personal notes, etc! Now all of that information, right at your fingertips!</p>
        </section>
        <section>
          <h3>Share with Co-Parents!</h3>
         Text or email info, or invite a co-parent to share your kid's contacts! Export dates into iCal or Google Calendar! (Coming Soon)
        </section>
        <section>
         <h3>Sign Up for the email list!</h3>
          
        <form className='signup-form'>
            <div>
              <label htmlFor="first-name">First name</label>
              <input placeholder='First Name' type="text" name='first-name' id='first-name' />
            </div>
            <div>
              <label htmlFor="last-name">Last name</label>
              <input type="text" name='last-name' id='last-name' placeholder='Last Name' />
            </div>
            <div>
              <label htmlFor="username">Email</label>
              <input type="text" name='username' id='username' />
            </div>

            <button type='submit'>Get on the email list!</button>
        </form>
        </section>
    
    
        </main>
    )
}