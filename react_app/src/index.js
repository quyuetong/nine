import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import Login from './pods/login';
import Register from './pods/register'
import MainPage from './main'
import "./index.css";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

class LoginCheck extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        const cookies = new Cookies();
        const authToken = cookies.get("token");
        this.state = {isLoggedIn: authToken !== undefined};
    }

    handleLogin() {
        this.setState({isLoggedIn: true});
    }

    handleLogout() {
        this.setState({isLoggedIn: false});
    }

    render() {
        if (this.state.isLoggedIn) {
            return <MainPage logoutToggle={this.handleLogout}/>
        }
        else {
            return (
                <HashRouter>
                    <div className="centered">
                        <h1>Hello! Welcome to Nine-To-Do-List!</h1>
                        <ul className="header">
                            <li><NavLink to="/pods/login">Login</NavLink></li>
                            <li><NavLink to="/pods/register">Register</NavLink></li>
                        </ul>
                        <div className="content">
                            <Route path="/pods/login" render={()=> (<Login loginToggle={this.handleLogin}/>)}/>
                            <Route path="/pods/register" component={Register}/>
                        </div>
                    </div>
                </HashRouter>
            )
        }
    }
}



ReactDOM.render(<LoginCheck />, document.getElementById('app'));