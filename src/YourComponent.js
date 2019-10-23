import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import * as stores from './store_directory.json';

class YourComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores,
      showingInfoWindow: false,
      activeMarker: {},
      selectedStore: {},
      addStore: false,
      list: '',
    };
  }
  //To open InfoWindow
  onMarkerClick = (props, marker) =>
  this.setState({
    selectedStore: props,
    activeMarker: marker,
    showingInfoWindow: true
  });
  

  //To close InfoWindow
  onMapClicked = () => {
    //If 'showingInfoWindow' is true, it'll change the state
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  //Show Markers about Data
  displayMarkers = () => { 
    return this.state.stores.map((store, index) => {  
      //For each store
      return <Marker 
      key={index}
      keyPlace={index}
      name={store.Name}
      address={store.Address}
      position={{
        lat: store.Coordinates.lat,
        lng: store.Coordinates.lng
      }}
      onClick={this.onMarkerClick}
      />
    })
  }

  showTable = () => {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>{this.state.list}</td>
            <Button color="danger">Remove</Button>
          </tr>
        </tbody>
      </Table>
    );
  }

  showFavorites = () => {
    return (
      <Table striped>
        <thead>
          <tr>
            <th style={{fontSize: 18}}><input name="user"  onChange={this.handleChange} type="checkbox" checked={this.state.addStore}/>{this.state.selectedStore.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{fontSize: 12, color: 'grey'}}>{this.state.selectedStore.address}</td>
          </tr>
        </tbody>
      </Table>
    );
  }

  handleChange = (event) => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.onChange : input.value;
    this.setState({ [input.name]: value });
  };
  
  handleFormSubmit = () => {
        const add = { key: this.state.selectedStore.keyPlace, name: this.state.selectedStore.name}
        console.log(add);
        localStorage.setItem('favorites', JSON.stringify(add));
        
        // localStorage.setItem(add.keyPlace, add.address);
  };

  componentDidMount() {
    // const add = this.state.selectedStore;
    // const rememberMe = localStorage.getItem(add.index);
    // this.setState({list: rememberMe})
    // console.log(this.state.list);
    let data = localStorage.getItem('favorites');
    this.setState({list: data});
  }

  render() {
    return (
      <div id='containerStyle'>
        <div className='containerFavorites' style={{ width: '30%', height: '100%', padding: 5}}>
          <div>
          <h2>What's here?</h2>
            {this.showFavorites()}
            <Button onClick={this.handleFormSubmit} color="primary">Save</Button>
          </div>
          <div style={{paddingTop: 15}}>
            <h2>My favorites stores</h2>
            {this.showTable()}
          </div>
        </div>
        <div className='containerMap' style={{ width: '100%', height: '100%', padding: 5}}>
          <Map
            google={this.props.google}
            zoom={13}
            initialCenter={{ lat: 19.432535, lng: -99.133605 }}
            >
            {this.displayMarkers()}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <h4>{this.state.selectedStore.name}</h4>
                  <p>{this.state.selectedStore.address}</p>
                </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCjinG1WHOv3meb6wHUfT-DCn-OarKcvew"
})(YourComponent);
