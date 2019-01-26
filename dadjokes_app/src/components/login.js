import React from 'react';
import axios from 'axios';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }
    inputHandler=e=>{
        this.setState({[e.target.name]:e.target.value});
    }
    login = e =>{
        e.preventDefault();
        const endpoint = 'http://localhost:4500/api/login';
        axios.post(endpoint, this.state).then(res=>{
            localStorage.setItem('jwtToken', res.data.token);
            console.log('success')
            //push to jokes
        }).catch(err=>{
            console.log('error=>', err)
        })
    }
    render(){
        return(
            <div>
                <h1> Login </h1>
                <form onSubmit={this.login} >
                    <input type="text" name='username' value={this.state.username} placeholder='username' onChange={this.inputHandler} />
                    <input type="password" name='password' value={this.state.password} placeholder='password' onChange={this.inputHandler} />
                    <button type='submit'>login</button>
                </form>
            </div>
        )
    }
}
export default Login;