import React from 'react';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var userName = this.props.user.name;

    return (
      <li className="user-list__item">
        <p>{userName}</p>
      </li>
    );
  }
}

export default User;
