import React, { Component } from 'react';
import { list, remove } from './apiMai'
import { isauthenticated } from '../auth';


// import {Link} from 'react-router-dom';

class Inbox extends Component {
    constructor() {
        super();
        this.state = {
            mails: [],
            deleted: false,
            error:''

        };
    }



    componentDidMount() {
        const userId = isauthenticated().user._id;
        const token = isauthenticated().token;
        list(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ mails: data })
            }
        })
    }


    clickSubmit = (mailId,event) => {
       remove(mailId).then((data) => {
            if (data.error) {
                this.setState({ error: data.error })
            } else {
                this.setState({ deleted: true })
            }
        });
    }

    refreshPage = () => { window.location.reload() }

    rendermails = (mails) => {
        if (this.state.deleted) {
            this.refreshPage()
        }
        return (
            <div className="row">
                {mails.map((mail, i) => (
                    <div className="card col-md-12" key={mail._id}>
                        <div className="card-body">
                            <h5 className="card-title">Subject:{mail.subject}</h5>
                            <p className="card-text">Body:{mail.body}</p>
                            <p className="card-text">NAME: {mail.author.name}</p>
                            <p className="card-text">SEND BY:{mail.author.email}</p>
                            <p className="card-text">Date:{new Date(mail.created).toDateString()}</p>
                            <button onClick={(e) => this.clickSubmit(mail._id, e)} className='btn btn-raised btn-danger'>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    };

    render() {
        const { mails } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Recent Emails</h2>
                {this.rendermails(mails)}
            </div>
        );
    }
}

export default Inbox;