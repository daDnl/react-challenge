import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import Toolbar from './components/Toolbar';
import UserList from './components/UserList';
import ActiveUser from './components/ActiveUser';
import UserData from './components/UserData';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: []
    };
  }

  
  componentDidMount() {
    fetch(`http://${window.location.host}/data.json`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, users } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className="container app">
          <SearchBar />
          <Toolbar />
          <div className="row">
            <UserList users={this.state.users} sort={this.state.sort} filter={this.state.filter}/>
            <ActiveUser />
          </div>
        </div>
      );
    }

  }
}
