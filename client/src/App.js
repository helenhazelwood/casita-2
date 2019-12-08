import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AllPlants from './components/allPlants'
import Routes from './routes'

class App extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
  // Fetches GET route from the Express server
  callBackendAPI = async () => {
    const response = await fetch('/api/express_test');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <p className="App-intro">{this.state.data}</p>
        <Routes />
      </div>
    );
  }
}

export default App;
