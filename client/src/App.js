import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar} from './components'
import Routes from './routes';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;
