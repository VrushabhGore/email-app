import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isauthenticated } from '../auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: '#ffffff' }
    }
}




const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-dark">

            {!isauthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to='/signup'>Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/')} to='/'>Sign In</Link>
                    </li>
                </>
            )}
            {isauthenticated() && (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/home')} to='/home'>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/search')} to='/search'>Search</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/sent')} to='/sent'>Sent</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" style={(isActive(history, '/signout'))} onClick={() => signout(() => history.push('/'))} >Sign Out</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href='#'> UserName: {isauthenticated().user.name}</a>
                    </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/mail/send')} to='/mail/send'>Send Mail</Link>
                </li>
                
               </>
      )}
        </ul>

    </div>
)

export default withRouter(Menu);

