import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var task = this.props.task;

    return (
      <li className="task-list__item">
        <p>{task}</p>
      </li>
    );
  }
}

export default Task;
