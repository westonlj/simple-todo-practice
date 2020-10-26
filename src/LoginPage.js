import React from 'react';

import TodoContainer from './components/TodoContainer';

// TODO: 
// add styling similar to the todo,
// add user profile that is stored in localStorage
// add ability to make new account and save that to loginData

class LoginPage extends React.Component {

    state = {
        loginData: [
            {username: 'liam@krum.io', password: 'password'}
        ],

        username: '',
        password: '',
        isLoggedIn: false,
    };
    
    handleSubmit = (e) => {

        if ((this.state.username === 'liam@krum.io' && this.state.password === 'password')) {
            
            console.log("Logged in")

            this.setState({
                isLoggedIn: true
            })
        } else {
            console.log("not Logged in")
        }
    }

    onChange = (event) => {
        
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        return (
            !this.state.isLoggedIn ?
                <div className="login-background">
                    <div>
                        <label>Email</label>
                            <input 
                                type="email"
                                placeholder="Enter Email"
                                value={this.state.email}
                                name="username"
                                onChange={this.onChange}
                            />
                    </div>
                    <div>
                        <label>Password</label>
                            <input 
                                type="password"
                                placeholder="Enter password"
                                value={this.state.password}
                                name="password"
                                onChange={this.onChange}
                            />
                    </div>
                    <button 
                        className="button-block" 
                        type="submit"
                        value="Submit"
                        onClick={this.handleSubmit}
                    >Login
                    </button>
                </div>
            //isLoggedIn is true
            : <TodoContainer />
        )
    }
}
export default LoginPage