import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import {MapView} from 'expo'
import { createStackNavigator } from 'react-navigation';
import AddTree from './AddTree'

export default class MapScreen extends React.Component {

  constructor(){
  super()
  this.state = {
    latitude: 41.067841,
    longitude: 29.045258,
  }
}

  static navigationOptions = {
    title: 'Map'
  }

  addPress(){
    //console.log('hi there')
    this.props.navigation.navigate('AddTree')
  }

  componentDidMount(){
     AsyncStorage.getItem('latitude')
     .then((result) => {
       this.setState({
         latitude: JSON.parse(result)
       })
     });
     AsyncStorage.getItem('longitude')
     .then((result) => {
       this.setState({
         longitude: JSON.parse(result)
       })
     });
   }
   findLocation(){
     navigator.geolocation.getCurrentPosition(
       (success) => {
         this.setState({
           latitude: success.coords.latitude,
           longitude: success.coords.longitude,
         })
       }, (error) => {
       },
       {}
     )
   }
   changeLocation(lat, long){
     this.setState({
       latitude: lat,
       longitude: long,
     })
   }
   saveLocation(){
     AsyncStorage.setItem('latitude', JSON.stringify(this.state.latitude))
     .then(() => this.setState({latitude: this.state.latitude}));
     AsyncStorage.setItem('longitude', JSON.stringify(this.state.longitude))
     .then(() => this.setState({longitude: this.state.longitude}));
   }

  render() {
    return(
      <View style={styles.container}>
      {/* <Text>testinggdddddddfkasjdhflksajdhflaksjdfhlaksjdhflkasjdhflkjshdkj</Text> */}

      {/* <MapView></MapView> */}
      {/* start */}
      <View style={{
    flex: 9
  }}>
  <View style={{flex: 1, flexDirection: 'column'}}>
    <TouchableOpacity
      onPress={this.changeLocation.bind(this, 41.067841, 29.045258)}
      style={{flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'}}>
      <Text>Istanbul</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={this.changeLocation.bind(this, -33.866174, 151.220345)}
      style={{flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'}}>
      <Text>Sydney</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={this.changeLocation.bind(this, 22.294074, 114.171995)}
      style={{flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'}}>
      <Text>Hong Kong</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={this.findLocation.bind(this)}
      style={{flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'}}>
      <Text>Here</Text>
    </TouchableOpacity>
  </View>
  <MapView style={{
    //flex: 7,
    width: 340, height: '85%', marginBottom: 140}}
    region={{
      latitude: 29.045258,
      longitude: 114.171995,
      latitudeDelta: 0.8,
      longitudeDelta: 0.8,
      }}
      //onRegionChangeComplete={this.saveLocation.bind(this)}
    />
  </View>
  {/* end */}
  <View style={{flex: 1, height: 50, width: 160, justifyContent: 'center', alignItems:'center',
    backgroundColor: '#28593b', marginTop: 10, marginBottom: 10,
    borderColor: '#28593b', borderWidth: 1, borderRadius: 16,
  paddingTop: 6, paddingBottom: 8, paddingLeft: 6, paddingRight: 6}}>
  <TouchableOpacity style={{justifyContent: 'center', alignItems:'center', flex: 1}}
    onPress={ () => {this.addPress()} }>
    <Text style={{fontSize: 19, color: '#ddf1ff'}}>add a tree!</Text></TouchableOpacity>
  </View>
      </View>
    )
  }
}

const Mapp = createStackNavigator(
  {
    Map: {
      screen: MapScreen
    },
    AddTree: {
      screen: AddTree
    }
  }, {initialRouteName: 'Map'}
)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7f2e2',
  }
});
