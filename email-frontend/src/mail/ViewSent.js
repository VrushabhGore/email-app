import React, {Component} from 'react';
import {list_sent} from './apiMai'
import {isauthenticated} from '../auth';

// import {Link} from 'react-router-dom';

class ViewSent extends Component {
    constructor(){
        super();
        this.state = {
            mails:[],

        };
    }

    componentDidMount(){
        const userId = isauthenticated().user._id;
        const token = isauthenticated().token;
        list_sent(userId,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                this.setState({mails:data})
            }
        })
    }

    rendermails = (mails) => {
        console.log(mails)
        return (
        <div className="row">
            {mails.map((mail,i)=>(
                <div className="card col-md-12" key={mail._id}>
                     <div className="card-body">
                         <h5 className="card-title">Subject:{mail.subject}</h5>
                         <p className="card-text">Body:{mail.body}</p>
                         <p className="card-text">NAME: {mail.author.name}</p>
                         <p className="card-text">SEND TO:{mail.reciever}</p>


                     </div>
                </div>
            ))}
        </div>
    )};

    render(){
        const{mails} = this.state;
        return(
            <div className="container">
                <h2 className="mt-5 mb-5">SENT Emails</h2>
                {this.rendermails(mails)}
            </div>
        );
    }
}

export default ViewSent;