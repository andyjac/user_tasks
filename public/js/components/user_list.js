import React from 'react';
import _ from 'lodash';
import User from './user';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderUsers() {
    return _.map(this.props.users, user => {
      return (
        <User user={user} key={user.id} baseUrl={this.props.baseUrl} />
      );
    });
  }

  render() {
    return (
      <div className="user-list__container">
        <h3>Users:</h3>
        <ul className="user-list">
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
}

export default UserList;
