import React from "react";
import {getUrl} from "../etc/request";
import axios from "axios/index";
import { getHeaders} from '../etc/headers';

export class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {success: 1};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.changeContentToOne = this.changeContentToOne.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const dataFromForm = new FormData(event.target);
        const data = {};
        for (const pair of dataFromForm.entries()) {
            data[pair[0]] = pair[1];
        }
        const url = getUrl("add_task");
        axios.post(url, JSON.stringify(data), getHeaders())
            .then(res => {
                if (res.data.result) {
                    this.changeContent({success: 2});
                }
            });
    }

    changeContent(content) {
        this.setState(content);
    }

    changeContentToOne() {
        this.changeContent({success: 1})
    }

    render() {
        if (this.state.success === 1){
            return (
                <div>
                    <AddTaskMenu submitToggle={this.handleSubmit}/>
                </div>
            );
        }
        else if (this.state.success === 2) {
            return (
                <div>
                    <h2>You item have been successful listed.</h2>
                    <button onClick={this.changeContentToOne}>Add more Task</button>
                </div>
            );
        }
    }
}

class AddTaskMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.submitToggle}>
                    <div id="addTask">
                        <label className="addTask">Task Name(*): </label>
                        <input name="name" type="text" placeholder="Enter Task Name" required/>
                    </div>
                    <div id="addTask">
                        <label className="addTask">Description: </label>
                        <br/>
                        <textarea className="addTask2" name="description" type="textarea" rows="5" cols="50" placeholder="Enter Description"/>
                    </div>
                    <div id="addTask">
                        <label className="addTask">Priority(*): </label>
                        <select name="priority">
                            <option value="5">Very High</option>
                            <option value="4">High</option>
                            <option value="3">Normal</option>
                            <option value="2">Low</option>
                            <option value="1">Very Low</option>
                        </select>
                    </div>
                    <div id="addTask">
                        <label className="addTask">Task expire date(*): </label>
                        <input type="date" name="expireDate" min={new Date().toISOString().split("T")[0]} required/>
                    </div>
                    <div id="addTask">
                        <input id="submit2" type="submit" value="Add Task"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddTask;