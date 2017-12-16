import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Flat from './components/flat';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: []
    };
  }

  componentDidMount () {
    const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
    fetch(url)  // AJAX
      .then(response => response.json())
      .then((data)  => {
        this.setState({
        flats: data
        });
      })
  }

  render() {
    return (
      <div className="app">
        <div className="main">
         <div className="search"></div>

          <div className="flats">
            {this.state.flats.map((flat) => {
              return <Flat flat={flat} />

            })}

          </div>
        </div>

        <div className="map">
        </div>
      </div>
      );
  }
}

export default App;
