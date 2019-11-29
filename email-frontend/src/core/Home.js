import React from 'react';
import Inbox from '../mail/Inbox'
const Home = () =>(
    <div>
        <div className="jumbotron">
        <h2>Home</h2>
        <p className="lead">
            Welcome to React Frontend!
        </p>
    </div>
    <div className="container">
        <Inbox/>
    </div>
    </div>
)

export default Home;