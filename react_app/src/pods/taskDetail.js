import React from "react";
import {getUrl} from "../etc/request";
import axios from "axios/index";
import Modal from './overlay'
import { getHeaders} from '../etc/headers';


export class TaskDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toggle: 0};
        this.changeDescription = this.changeDescription.bind(this);
        this.changeCompleted = this.changeCompleted.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    componentDidMount() {
        const self = this;
        self.reloadTask();
    }

    reloadTask() {
        const self = this;
        self.setState({toggle: 0});
        const data = {"id": self.props.target.id};
        const url = getUrl("get_task");
        axios.post(url, JSON.stringify(data),getHeaders())
            .then(function (res) {
                self.setState(
                    {
                        toggle: 1, id: res.data.id, name: res.data.name,
                        description: res.data.description, priority: res.data.priority,
                        expire_date: res.data.expire_date, state: res.data.state
                    })
            })
    }

    changeDescription() {
        const content = prompt("Please enter new description","");
        if (content === null) {
            return
        }
        const data = {description: content, id: this.state.id};
        const url = getUrl("edit_task");
        axios.post(url, JSON.stringify(data), getHeaders())
            .then(res => {
                if (res.status === 200){
                    this.reloadTask();
                }
            });
    }

    changeCompleted() {
        const newState = !this.state.state;
        const stringState = newState === true ? "Completed" : "Not Completed";
        const confirm = window.confirm('Do you want to set this task as ' + stringState);
        if (!confirm) {
            return
        }
        const data = {state: newState, id: this.state.id};
        const url = getUrl("edit_task");
        axios.post(url, JSON.stringify(data), getHeaders())
            .then(res => {
                if (res.status === 200){
                    this.reloadTask();
                }
            });
    }

    deleteTask() {
        const confirm = window.confirm('Are you sure you want to delete this task?');
        if (!confirm) {
            return
        }
        const data = {id: this.state.id};
        const url = getUrl("delete_task");
        axios.post(url, JSON.stringify(data), getHeaders())
            .then(res => {
                if (res.status === 200){
                    this.props.closeModal()
                }
            });
    }

    getPriority(p) {
        const priorityMap = [];
        priorityMap[1] = 'Very Low';
        priorityMap[2] = 'Low';
        priorityMap[3] = 'Normal';
        priorityMap[4] = 'High';
        priorityMap[5] = 'Very High';
        return priorityMap[p]
    }

    render() {
        if (this.state.toggle === 0){
            return <h1>Loading.....</h1>
        }
        else {
            return (
                <div>
                    <label className="taskDetail">Task ID: </label>
                    <label className="taskDetail">{this.state.id}</label>
                    <br/>
                    <label className="taskDetail">Task Name: </label>
                    <label className="taskDetail">{this.state.name}</label>
                    <br/>
                    <label className="taskDetail">Description: </label>
                    <label className="taskDetail">{this.state.description}</label>
                    <a href="javascript: return false;" onClick={this.changeDescription}>Edit Description</a>
                    <br/>
                    <label className="taskDetail">Expire Date: </label>
                    <label className="taskDetail">{this.state.expire_date}</label>
                    <br/>
                    <label className="taskDetail">Priority: </label>
                    <label className="taskDetail">{this.getPriority(this.state.priority)}</label>
                    <br/>
                    <label className="taskDetail">Completed?: </label>
                    <label className="taskDetail">{this.state.state  === true ? 'Yes' : 'No' }</label>
                    <a href="javascript: return false;" onClick={this.changeCompleted}>Change Completed</a>
                    <br/>
                    <button className="taskDetail" onClick={this.props.closeModal}>Close</button>
                    <button className="taskDetail" onClick={this.deleteTask}>Delete Task</button>
                </div>
            )
        }
    }
}

export default TaskDetail