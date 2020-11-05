import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TodoContainerFunctional from './components/TodoContainerFunctional';

import './iron-flex-layout.css';
import './iron-flex-layout-classes.css';
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

                        <div className="layout vertical login-container">

                            <div className="layout horizontal center center-justified app-logo-container">
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
                                
                                <div className="layout horizontal">
                                
                                    <TextField 
                                        type="email"
                                        label="Email"
                                        placeholder="Enter Email"
                                        className="flex"
                                        value={this.state.email}
                                        margin="normal"
                                        name="username"
                                        onChange={this.onChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                
                                </div>
                                
                                <div className="layout horizontal">
                                
                                    <TextField
                                        type="password"
                                        label="Password"
                                        placeholder="Enter password"
                                        className="flex"
                                        value={this.state.password}
                                        margin="normal"
                                        name="password"
                                        onChange={this.onChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                
                                </div>
                                
                                <div className="height-20"></div>

                                <div className="layout horizontal">
                                
                                    <Button
                                        className="flex input-submit"
                                        fullWidth variant="contained"
                                        type="submit"
                                        onKeyDown={this.handleSubmit}
                                        color="primary"
                                        style={{maxWidth: "unset"}}
                                    >
                                    Login
                                    </Button>
                                
                                </div>

                            </div>

                                <div className="login-section-break"></div>

                                <div className="layout horizontal center center-justified request-account-section">
                                    <span>Don't have an account? </span> &nbsp; <a href="https://www.google.com">Request access</a>
                                </div>

                        </div>
                    
                    </form>
                //isLoggedIn is true
                : <TodoContainerFunctional/>
            )
        } else {
            return(<TodoContainerFunctional/>)
        }
    }
}
export default LoginPage