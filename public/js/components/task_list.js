import React from 'react';
import _ from 'lodash';
import Task from './task';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTasks() {
    if (!this.props.tasks) {
      this.props.fetchTasks();

      return <p>Loading...</p>;
    }

    return _.map(this.props.tasks, task => {
      return (
        <Task task={task} key={task} />
      );
    });
  }

  render() {
    return (
      <div className="task-list__container">
        <h4>Current Tasks:</h4>
        <ol className="task-list">
          {this.renderTasks()}
        </ol>
      </div>
    );
  }
}

export default TaskList
