import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import UserList from './components/user_list';

const BASE_URL = 'https://push-code-assessment.herokuapp.com/v1/api/users';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  componentWillMount() {
    request
      .get(BASE_URL)
      .end((err, data) => {
        if (err) {
          return console.log(err);
        }

        this.setState({users: JSON.parse(data.text)});
      });
  }

  render() {
    if (!this.state.users) {
      return <p className="text-center">Loading...</p>;
    }

    return (
      <UserList users={this.state.users} baseUrl={BASE_URL} />
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
