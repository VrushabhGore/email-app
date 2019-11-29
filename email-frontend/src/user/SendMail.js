import React,{Component} from 'react';
import {create} from '../mail/apiMai'
import {isauthenticated} from '../auth';


class SendMail extends Component{
    constructor(){
        super();
        this.state = {
            subject:'',
            body:'',
            reciever:'',
            error:'',
            user:{},
            loading:false,
            successful:false,
        }
    }



    componentDidMount(){
        this.maildata = new FormData();
        this.setState({user:isauthenticated().user})
    }

    isValid = () => {
        const {subject,body,reciever} = this.state;

        if(subject.length === 0 || body.length === 0 || reciever.length === 0){
            this.setState({error:'All fields are required',loading:false})
            return false
        }
        return true
    }

    handleChange = name => event => {        
        this.setState({error:''});
        const value = event.target.value
        this.setState({[name]: event.target.value} );
        this.maildata.set(name,value)
    }

    clickSubmit = event =>{
            event.preventDefault();
            this.setState({loading:true});
            console.log(this.isValid());
                        
            if(this.isValid()){
                const userId = isauthenticated().user._id;
                const token = isauthenticated().token;
                console.log(userId,token);
                
                create(userId,token,this.maildata).then(data =>{
                    if(data.error){
                        this.setState({error:data.error})
                    }else{
                        console.log('Mail Sent:',data);
                        this.setState({loading:false,subject:'',body:'',reciever:'',successful:true});
                        
                    }
                });
            }
    }


    sendMailForm = (subject,body,reciever) => (
        <form>
        <div className='form-group'>
            <label className='text-muted'>Subject</label>
            <input onChange={this.handleChange('subject')} type="text" className="form-control" value={subject}/>
        </div>
        <div className='form-group'>
            <label className='text-muted'>Body</label>
            <input onChange={this.handleChange('body')} type="text" className="form-control" value={body}/>
        </div>
        <div className='form-group'>
            <label className='text-muted'>Reciever Email</label>
            <input onChange={this.handleChange('reciever')} type="email" className="form-control"value={reciever}/>
        </div>
        <button onClick={this.clickSubmit} className='btn btn-raised btn-primary'>Send Mail</button>
    </form>
    )
    
    render(){
        const {
            subject,
            body,
            reciever,
             error,loading,successful
        } = this.state;

        return(
            <div className="container">
                <h2 className="mt-5 mb-5">Send Mail</h2>
                <div className='alert alert-danger' style={{display:error ? '':'none'}}>
                    {error}
                </div>
                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading Please Wait...</h2>
                    </div>
                ):''}
                {this.sendMailForm(subject,body,reciever)}
                <div className="alert alert-info" style={{display: successful?'':'none'}}>
                    Email Sent!
                </div>
            </div>
        )
    }


}

export default SendMail;