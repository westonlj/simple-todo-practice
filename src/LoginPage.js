import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TodoContainer from './components/TodoContainer';

import logo from './krum-gear.png';
// TODO: 
// add styling similar to the todo,
// add user profile that is stored in sessionStorage
// add ability to make new account and save that to loginData

class LoginPage extends React.Component {

    state = {
        loginData: {username: 'liam@krum.io', password: 'password'},

        username: '',
        password: '',
        isLoggedIn: false,
    };
    
    handleSubmit = (e) => {
        // stops the form submittion from just reloading page
        // because if the event does not get explicitly handled its default
        // action should not trigger
        e.preventDefault();
        // session storage still needs to persist on page reload!!
        // does a sessionStorage object already exist?        

        if ((this.state.username === 'liam@krum.io' && this.state.password === 'password')) {

            if(sessionStorage) {
                const loginInfo = {
                    Username: this.state.username,
                    Password: this.state.password,
                }
                sessionStorage.setItem('LoginInfo', JSON.stringify(loginInfo));
                // sessionStorage.setItem('Username', this.state.username)
                // sessionStorage.setItem('Password', this.state.password)
            }

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
        if(!sessionStorage.getItem('LoginInfo')) {
            return (
                !this.state.isLoggedIn ?
                    <form onSubmit={this.handleSubmit} className="layout-main-container">
                        <div className="login-container">
                            <div className="layout-horizontal">
                                <img 
                                    src={logo}
                                    className="app-logo"
                                    sizing="contain"
                                    alt="Todo Logo"
                                    />
                            </div>
                            <div className="layout-horizontal">
                                <span className="app-title">Welcome, please login</span>
                            </div>
                            {/* Input container */}
                            <div className="login-input-container">
                                <div className="layout-horizontal">
                                    <TextField 
                                        type="email"
                                        label="Username"
                                        placeholder="Enter Email"
                                        value={this.state.email}
                                        name="username"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="layout-horizontal">
                                    <TextField
                                        className=""
                                        type="password"
                                        label="Password"
                                        placeholder="Enter password"
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="layout-horizontal">
                                <Button
                                className="input-submit"
                                fullWidth variant="contained"
                                type="submit"
                                onKeyDown={this.handleSubmit}
                                color="primary"
                                >
                                Login
                                </Button>
                            </div>
                        </div>
                    </form>
                //isLoggedIn is true
                : <TodoContainer/>
            )
        } else {
            return(<TodoContainer/>)
        }
    }
}
export default LoginPage