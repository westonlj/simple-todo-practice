import React from 'react';

import TodoContainer from './components/TodoContainer';

class LoginPage extends React.Component {

    state = {
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

    // handleChange(event) {
    //     this.setState({ 
    //         username: event.state.username,
    //         password: event.state.password
    //     });
    // }

    render() {
        if(!this.state.isloggedIn) {
            return (
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
            )
        } else {
            console.log("I am logged in")
            return (
                <TodoContainer />
            )
        }
    }
}

export default LoginPage