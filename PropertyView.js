'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});

class PropertyView extends Component {

  render() {
      console.log("here");
      console.log(this.props.property.guid);
    var bigPic = this.props.property.edmIsShownBy;
    var summary = this.props.property.dcDescription[0];
      var creator = this.props.property.dcCreator[0];
      var title = this.props.property.title[0];

   return (  
      <View style={styles.container}>
        <Image style={styles.image}
            source={{uri: bigPic[0]}} />
        <View style={styles.heading}>
         
          <Text style={styles.title}>{title}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{creator}</Text>
        <Text style={styles.description}>{summary}</Text>
      </View>
    );
  }
}

module.exports = PropertyView;
