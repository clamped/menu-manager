import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Menu Manager</h1>
        </header>
        <p><small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small></p>

      </div>
    );
  }
}

export default App;
