import React from 'react';
import { getCookie, removeCookie} from './etc/cookie'
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import AddTask from './pods/addTask'
import ListTask from "./pods/listTask";

export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {isAdmin: getCookie("isAdmin")};
    }

    logout() {
        removeCookie();
        this.props.logoutToggle();
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Hello {getCookie("firstname")}! Welcome to To Do List App</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/pods/addTask">Add A New Task</NavLink></li>
                        <li><NavLink to="/pods/listTask">List My Task</NavLink></li>
                        <li><NavLink exact to="/logout" onClick={this.logout}>Logout</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/pods/addTask" component={AddTask}/>
                        <Route path="/pods/listTask" component={ListTask}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default MainPage;