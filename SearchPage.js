'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';

var SearchResults = require('./SearchResults');

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 138
  }
});

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      wskey:'NbAjJewQk',
      encoding:'json',
      profile:'rich',
      thumbnail:true,
      IMAGE_SIZE:'large',
  
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://europeana.eu/api/v2/search.json?' + querystring;
};

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'athens',
      isLoading: false,
    
    };
  }

  onSearchTextChanged(event) {
    console.log('onSearchTextChanged');
    this.setState({ searchString: event.nativeEvent.text });
    console.log(this.state.searchString);
  }

  _executeQuery(query) {
    
    this.setState({ isLoading: true });
  console.log(query);
    fetch(query)
   
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error =>
       this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
     }));
  }

  _handleResponse(json) {
    this.setState({ isLoading: false , message: '' });
    if (json.success == 1) {
      console.log(json);
      
      this.props.navigator.push({
        title: 'Results',
        component: SearchResults,
        passProps: {items: json.items}
      });
    } else {

console.log(JSON.stringify(json.success));
      this.setState({ message: 'Location not recognized; please try again.'});
    }
  }

  onSearchPressed() {
    var query = urlForQueryAndPage('query', this.state.searchString, 1);
    this._executeQuery(query);
  }

  onLocationPressed() {
    navigator.geolocation.getCurrentPosition(
      location => {
        var search = location.coords.latitude + ',' + location.coords.longitude;
        this.setState({ searchString: search });
        var query = urlForQueryAndPage('centre_point', search, 1);
        this._executeQuery(query);
      },
      error => {
        this.setState({
          message: 'There was a problem with obtaining your location: ' + error
        });
      });
  }

  render() {
    console.log('SearchPage.render');

    var spinner = this.state.isLoading ?
    ( <ActivityIndicator
        size='large'/> ) :
    ( <View/>);

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.searchString}
          onChange={this.onSearchTextChanged.bind(this)}
          placeholder='Search via name or postcode'/>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search via name or postcode'/>
          <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'>
            <Text
              style={styles.buttonText}
              onPress={this.onSearchPressed.bind(this)}>
              Go
            </Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onLocationPressed.bind(this)}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
        <Image source={require('./Resources/house.png')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

module.exports = SearchPage;
