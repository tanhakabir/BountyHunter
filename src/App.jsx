import React from 'react';
import io from 'socket.io-client';
import './App.css';

import defaultPort from './constants';

var socket;
if(process.env.NODE_ENV !== 'production') {
  socket = io(window.location.protocol + '//' + window.location.hostname + ':' + defaultPort);
} else {
  socket = io();
}

class App extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {value: '',
                  messages: ['abc', 'bcd']};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    socket.on('chat message', (message) => {
      console.log("received", message)
      this.setState({messages: [...this.state.messages, message]})
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    socket.emit('chat message', this.state.value);
    console.log('sending', this.state.value)
    this.setState({value: ""})
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.messages.map((msg) =>
            <li>{msg}</li>
          )}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
