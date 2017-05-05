'use strict';
<<<<<<< HEAD

var React = require('react');
var ReactNative = require('react-native');

var SearchPage = require('./SearchPage');

var styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});

class PropertyFinderApp extends React.Component {
  render() {
    return (
      <ReactNative.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}/>
    );
  }
}

ReactNative.AppRegistry.registerComponent('PropertyFinder', function() { return PropertyFinderApp });
=======
var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AlertIOS,
} = React;
const url = 'https://europeana.eu/api/v2/search.json?wskey=NbAjJewQk&query=europeana_collectionName:*&facet=europeana_collectionName&f.europeana_collectionName.facet.limit=2000&profile=facets'
var testeuroapi = React.createClass({
    _onPressButtonGET: function() {
        fetch(url, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            AlertIOS.alert(
                "GET Response",
                "Search Query -> " + responseData.search
            )
        })
        .done();
    },
    _onPressButtonPOST: function() {
        fetch("http://localhost:3000/test", {method: "POST", body: JSON.stringify({username: "nraboy", firstname: "Nic", lastname: "Raboy"})})
        .then((response) => response.json())
        .then((responseData) => {
            AlertIOS.alert(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData.body)
            )
        })
        .done();
    },
    render: function() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this._onPressButtonGET} style={styles.button}>
                    <Text>GET</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onPressButtonPOST} style={styles.button}>
                    <Text>POST</Text>
                </TouchableHighlight>
            </View>
        );
    },
});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        backgroundColor: '#eeeeee',
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
    }
});
AppRegistry.registerComponent('ReactProject', () => testeuroapi);
>>>>>>> 499977e897a666e5d0f26eef2cbc31b721560c79
