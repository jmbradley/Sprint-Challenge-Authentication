import React, { Component } from 'react';
import logo from './logo2.png';
import axios from 'axios';
import './App.css';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      };
    }

    getJokes = (req, res) => {
      axios
        .get(
          'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
        )
        .then((res) => {
          this.setState({...this.state.jokes, jokes: res.data})
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={this.getJokes}>Get Me My Jokes!</button>
          {this.state.jokes.map( joke => (
            
            <h3>{joke.setup}<br/>
                {joke.punchline}
            </h3>
            ))}
        </header>
      </div>
    );
  }
}

export default App;
