 import React from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';
import Flat from './components/flat';
import Marker from './components/marker';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      allFlats: [],
      selectFlat: null,
      search: ""
    };
  }

  componentDidMount () {
    const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
    fetch(url)  // AJAX
      .then(response => response.json())
      .then((data)  => {
        this.setState({
          flats: data,
          allFlats: data
        });
      })
  };


  selectFlat = (flat) => {
    console.log(flat);
    this.setState({
      selectFlat: flat
    })

  }

  handleSearch = (event) => {
    console.log(event);
    this.setState({
      search: event.target.value,
      flats: this.state.allFlats.filter((flat) =>
        new RegExp(event.target.value, "i").exec(flat.name))
    })
  }

  render() {
    let center = {
    lat: 48.8566,
    lng: 2.3522
     }

    if (this.state.selectFlat) {
      center = {
        lat: this.state.selectFlat.lat,
        lng: this.state.selectFlat.lng

      }
    }

    return (
      <div className="app">
        <div className="main">
         <div className="search">
         <input
          type="text"
          placeholder="Search ..."
          value={this.state.search}
          onChange={this.handleSearch} />
         </div>

          <div className="flats">
            {this.state.flats.map((flat) => {
              return <Flat
                key={flat.name}
                flat={flat}
                selectFlat={this.selectFlat} />

            })}

          </div>
        </div>

        <div className="map">
          <GoogleMapReact
            apiKey = {AIzaSyClSzD-VLSQ26x-TWN983NfDchlFVPG8qI}
            center={center}
            zoom={14 }
          >

          {this.state.flats.map((flat) => {
              return <Marker
              key={flat.name}
              lat={flat.lat}
              lng={flat.lng}
              text={flat.price + " €"}
              selected={flat === this.state.selectFlat}
              />

            })}
          </GoogleMapReact>

        </div>
      </div>
      );
  }
}

export default App;
