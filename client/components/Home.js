import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { createStackNavigator } from 'react-navigation';
import Map from './Map'

export default class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Home'
  // }
  constructor(){
    super()
    this.state = {
      trees: [],
      userId: '5b62420ef81f8651bed5c659'
    }
  }

  mapPress() {

    fetch('http://4afb1aa4.ngrok.io/viewmap', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }

    })
    .then((response) =>
    {
    console.log(response)
    return response.json()
  })
    .then((responseJson) => {
      //console.log(responseJson)
      this.setState({
        trees: responseJson
      })
    })
    .then(() => {this.props.navigation.navigate('Map', {trees: this.state.trees, userId: this.state.userId})})
    .catch((err) => {
      alert("error: ", err)
      });



  }

  render() {
    return(
      <View style={styles.container}>

        <View style={{flex: 5, width: 300, height: 100, justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 90,
          backgroundColor: '#d9e4fc', borderColor: 'white', borderRadius: 20, borderWidth: 7}}>
          <Text style={{ color: '#28593b', fontSize: 20, marginBottom: 19}}>
            welcome to
          </Text>
          <Text style={{ color: '#28593b', fontSize: 45, fontFamily: 'ArialRoundedMTBold'}}>
            TREE-O-CACHING!
          </Text>
         </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems:'center', width: 100, height: 45,
          backgroundColor: '#28593b', marginTop: 7, marginBottom: 170, borderColor: 'white',
        borderWidth: 3, borderRadius: 26, justifyContent: 'center', alignItems: 'center',
      paddingTop: 6, paddingBottom: 6, paddingLeft: 6, paddingRight: 6}}>
        <TouchableOpacity onPress={ () => {this.mapPress()} } style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{flex: 1, fontSize: 35, color: '#ddf1ff'}}> map </Text>
        </TouchableOpacity>
        </View>

        {/* <Map latitude={this.state.latitude} longitude={this.state.longitude}/> */}
      </View>
    )
  }
}

// const Home = createStackNavigator(
//   {
//     Home: {
//      screen: HomeScreen
//    },
//    Map: {
//      screen: Map
//    }
//  }, {initialRouteName: 'Home'})
//
//  export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7f2e2',
  }
});
