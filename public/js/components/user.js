import React from 'react';
import request from 'superagent';
import TaskList from './task_list';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTasks: false,
      tasks: null
    }
  }

  renderTaskList() {
    if (!this.state.showTasks) {
      return null;
    }

    return (
      <TaskList
        tasks={this.state.tasks}
        fetchTasks={this.fetchTasks.bind(this)}
      />
    );
  }

  fetchTasks() {
    const TASKS_URL = this.buildUserTasksUrl();

    request
      .get(TASKS_URL)
      .end((err, data) => {
        if (err) {
          return console.log(err);
        }

        this.setState({tasks: JSON.parse(data.text)});
      });
  }

  buildUserTasksUrl() {
    var id = this.props.user.id;

    return this.props.baseUrl + '/' + id + '/tasks';
  }

  toggleTaskList() {
    this.setState({showTasks: !this.state.showTasks});
  }

  render() {
    var userName = this.props.user.name;
    var taskButtonText = this.state.showTasks ? 'Hide tasks' : 'Show tasks';

    return (
      <li className="user-list__item">
        <p>{userName}</p>
        <button onClick={this.toggleTaskList.bind(this)}>
          {taskButtonText}
        </button>
        {this.renderTaskList()}
      </li>
    );
  }
}

export default User;
