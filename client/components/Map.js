import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import {MapView, Location, Permissions} from 'expo'
import { createStackNavigator } from 'react-navigation';
import AddTree from './AddTree'
import TreeProfile from './TreeProfile'



export default class MapScreen extends React.Component {

  constructor(props){
  super(props)
  //console.log(props)
  const { navigation } = this.props
  const userId = navigation.getParam('userId', '5b62420ef81f8651bed5c659')
  this.state = {
    latitude: 37.776599,
    longitude: -122.445,
    userId: userId,
    userItems: []
  }
}

  // static navigationOptions = {
  //   title: 'Map'
  // }

  addPress(){
    //console.log('hi there')
    //this.setLocation()

    fetch('http://4afb1aa4.ngrok.io/addTree?userId=' + this.state.userId, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }

    })
    .then((response) =>
    {
    //console.log(response)
    return response.json()

  })
    .then((responseJson) => {
      //console.log(responseJson)
      this.setState({
        userItems: responseJson
      })
      //console.log("ITEMS", this.state.userItems)
    })
    .then(() => {this.props.navigation.navigate('AddTree', {userItems: this.state.userItems})})
    .catch((err) => {
      alert("error: ", err)
      });


    //this.props.navigation.navigate('AddTree')

  }

componentDidMount(){
  try{
    //console.log('asdf')
    this.setLocation()
  } catch(e){
    console.log(e)
  }
}

setLocation=async() => {

  //console.log('hi')
  let {status} = await Permissions.askAsync(Permissions.LOCATION)
  //console.log("status", status)
  if(status !== 'granted'){
    alert('permission denied')
    return;
  }

    let location = await Location.getCurrentPositionAsync({})
    //console.log("location", location)

    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    })

    //set to local storage. asyncStorage
    try{
      await AsyncStorage.setItem('latitude', JSON.stringify(this.state.latitude))
      try{
        await AsyncStorage.setItem('longitude', JSON.stringify(this.state.longitude))
        // try {
        //   this.props.navigation.navigate('AddTree');
        // } catch (err) {
        //   console.log(err)
        // }
      } catch(err) {
        console.log(err)
      }

    } catch (err) {
      console.log(err)
    }
}

  viewTree(tree){
    this.props.navigation.navigate('TreeProfile', {tree: tree})
  }

  render() {
    const { navigation } = this.props
    const trees = navigation.getParam('trees', [])
    // const userId = navigation.getParam('userId', '5b62420ef81f8651bed5c659')

    //console.log(trees)
    return(
      <View style={styles.container}>

      <View style={{flex: 11, borderColor: '#d9e4fc', borderWidth: 10, borderRadius: 20, marginTop: 40, marginBottom: 30}}>
  <MapView style={{
    //flex: 7,
    width: 340, height: '100%'}}
    region={{
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: .006,
      longitudeDelta: .006,
      }}>



      {trees.map((tree, index) => {
        return(

          <MapView.Marker
            onPress={(() => this.viewTree(tree))}
            key={index}
            coordinate={{
              'latitude': tree.latitude,
              'longitude': tree.longitude
            }}
          />

        )
      })}
    </MapView>
  </View>

  <View style={{flex: 1, height: 50, width: 160, justifyContent: 'center', alignItems:'center',
    backgroundColor: '#28593b', marginTop: 5, marginBottom: 20,
    borderColor: 'white', borderWidth: 3, borderRadius: 26,
  paddingTop: 6, paddingBottom: 8, paddingLeft: 6, paddingRight: 6}}>
  <TouchableOpacity style={{justifyContent: 'center', alignItems:'center', flex: 1}}
    onPress={ () => {this.addPress()} }>
    <Text style={{fontSize: 27, color: '#ddf1ff'}}>add a tree!</Text></TouchableOpacity>
  </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7f2e2',
  }
});
