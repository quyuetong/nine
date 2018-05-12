import React from "react";
import { getUrl } from '../etc/request';
import axios from "axios/index";
import Modal from './overlay'
import TaskDetail from './taskDetail'
import {getHeaders} from "../etc/headers";


export class ListTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {result: [], init: 0};
        this.changeContent = this.changeContent.bind(this);
        this.reloadTasks = this.reloadTasks.bind(this);
    }

    componentDidMount() {
        const self = this;
        self.reloadTasks();
    }

    reloadTasks(sort_by='', reverse=false) {
        const self = this;
        const url = getUrl("get_tasks");
        const data = {sort_by: sort_by, reverse: reverse};
        axios.post(url, JSON.stringify(data), getHeaders())
            .then(function (res) {
                self.changeContent(res.data)
            })
    }

    changeContent(content) {
        this.setState({result: content, init: 1});
    }

    render() {
        if (this.state.init === 0){
            return (
                <h1>Loading.....</h1>
            );
        }
        else if(this.state.result.length === 0){
            return (
                <h1>You don't have any task yet.</h1>
            );
        }
        else {
            return (
                <div>
                    <Table data={this.state.result} reload={this.reloadTasks}/>
                </div>
            );
        }
    }
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isModalOpen: false, priority: false, expire_date: false};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.sort_by_priority = this.sort_by_priority.bind(this);
        this.sort_by_expire_date = this.sort_by_expire_date.bind(this);
    }

    sort_by_priority() {
        const reverse = this.state.priority;
        this.props.reload("priority", reverse);
        this.setState({priority: !reverse})
    }

    sort_by_expire_date() {
        const reverse = this.state.expire_date;
        this.props.reload("expire_date", reverse);
        this.setState({expire_date: !reverse})
    }

    render() {
        return (
            <div>
                <table id="t01">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Task Name</th>
                        <th><a href="javascript: return false;" onClick={this.sort_by_priority}>Priority</a></th>
                        <th><a href="javascript: return false;" onClick={this.sort_by_expire_date}>Expire Date</a></th>
                        <th>Complete?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.map(row => {
                        return <TableRow openModal={this.openModal} closeModal={this.closeModal} row={row}/>
                    })}
                    </tbody>
                </table>
                <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                    <TaskDetail target={this.target} closeModal={this.closeModal}/>
                </Modal>
            </div>
        );
    }

    openModal(id) {
        this.target = id;
        this.setState({ isModalOpen: true })
    }

    closeModal() {
        this.setState({ isModalOpen: false });
        this.props.reload()
    }
}

class TableRow extends React.Component {
    constructor(props) {
        super(props);
        this.goToItem = this.goToItem.bind(this);
    }

    goToItem() {
        this.props.openModal(this.props.row);
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
        return (
            <tr>
                <td>{this.props.row.id}</td>
                <td><a href="javascript: return false;" onClick={this.goToItem}>{this.props.row.name}</a></td>
                <td>{this.getPriority(this.props.row.priority)}</td>
                <td>{this.props.row.expire_date}</td>
                <td>{this.props.row.state  === true ? 'Yes' : 'No' }</td>
            </tr>
        );
    }
}

export default ListTask;