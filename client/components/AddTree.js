import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  //ListView,
  Picker
} from 'react-native'
import Map from './Map'
import { createStackNavigator } from 'react-navigation';
let lat = 0;
let long = 0;
import axios from 'axios';

export default class AddTreeScreen extends React.Component {

  // static navigationOptions = {
  //   title: 'AddTree'
  // }
  constructor() {
    super()
    this.state = {
      lat: 0,
      long: 0,
      selectedItem: '',
      trees: []
    }
  }

  componentDidMount() {
    try {

      this.retrieveData()

    } catch(err) {
        console.log(err)
    }
  }

  retrieveData = async () => {
    try {
      const latitude = await AsyncStorage.getItem('latitude')
      if (latitude !== null){
        //console.log('data successfully retrieved from asyncstorage: ', latitude)
        this.setState({
          lat: latitude
        })
      }
      const longitude = await AsyncStorage.getItem('longitude')
      if (longitude !== null){
        //console.log('data successfully retrieved from asyncstorage: ', longitude)
        this.setState({
          long: longitude
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  newItem(){
    //fetch (post), then show user's items. to be implemented later.
  }


  plantTree(){

    //get from async storaage
    var self = this;

    //fetch (post), then redirect to map
    //console.log("selected ", this.state.selectedItem);
    //console.log("lat", this.state.lat);
    axios.post('http://4afb1aa4.ngrok.io/addtree', {
        latitude: this.state.lat,
        longitude: this.state.long,
        item: this.state.selectedItem
    })
    .then(res => {
      //console.log(res);
    })
    .catch(e => console.log(e));


    // fetch('http://5c6995b2.ngrok.io/addtree', {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     latitude: this.state.lat,
    //     longitude: this.state.long,
    //     item: this.state.selectedItem
    //   })
    //
    // })
    // .then((response) => {
    //   console.log("first", response.json());
    //   return response.json()
    // })
    // .catch((err) => {
    //   alert("error: ", err)
    //   });
    axios.get('http://4afb1aa4.ngrok.io/viewmap')
    .then(async (response) => {
      await this.setState({trees: response.data});
      // console.log("this is the trees!!!", trees.data);
      //alert(response.data.length)
      this.props.navigation.navigate('Map', {trees: self.state.trees});
    })
    .catch(e => console.log(e));
      // fetch('http://5c6995b2.ngrok.io/viewmap', {
      //   method: 'GET',
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // })
      // .then((response) => {
      //   console.log("second", response.json());
      //   return response.json()
      // })
      // .then((responseJson) => {
      //   console.log('Array of trees', responseJson);
      //   this.setState({
      //     trees: responseJson
      //   })
      // })
      // .then(() => {this.props.navigation.navigate('Map', {trees: this.state.trees})})
      // .catch((err) => {
      //   alert("error32342342: ", err)
      //   });




  }

  render() {

    const { navigation } = this.props
    const userItems = navigation.getParam('userItems', [])
    console.log(userItems)
    return(
      <View style={styles.container}>

          {/* photo of tree */}
          {/* <TouchableOpacity style={{flex: 1, height: 35, width: 70,
            backgroundColor: '#28593b', marginTop: 20, marginBottom: 20,
            borderColor: '#28593b', borderWidth: 1, borderRadius: 16, justifyContent: 'center',
            alignItems: 'center', paddingTop: 6, paddingBottom: 10, paddingLeft: 6, paddingRight: 8
        }}>
            <Text style={{fontSize: 25, color: '#ddf1ff'}}> Upload photo of tree </Text>
          </TouchableOpacity> */}

          <View style={{flex: 1}}>
          <Text style={{fontSize: 25, color: '#28593b'}}> longitude: {this.state.lat}</Text>
          <Text style={{fontSize: 25, color: '#28593b', marginBottom: 80}}> latitude: {this.state.long}</Text>
          <Text style={{fontSize: 25, color: '#28593b', marginBottom: 17}}> add one of your items to this tree! {this.state.items}</Text>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Picker
            selectedValue={this.state.selectedItem}
            style={{ height: '50%', width: '80%', marginLeft: 10, marginRight: 10,
            justifyContent: 'center',  backgroundColor: '#d9e4fc', borderColor: 'white',
            borderWidth: 3, borderRadius: 20, flex: 1}}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({selectedItem: itemValue})
            }
          }>
            {userItems.map((item, index) => {
              console.log("item", item)
              if(item !== null){
              return(

            <Picker.Item key={index} style={{ color: 'white'}} label={item.name} value={item._id} />

            )}
            })}
          </Picker>
          </View>
          </View>

        <View style={{flex: 1, height: 50, width: 300, justifyContent: 'center', alignItems: 'center'}}>
        {/* <TouchableOpacity style={{flex: 1, height: 35, width: 200,
          backgroundColor: '#28593b', marginTop: 20, marginBottom: 20,
          borderColor: '#28593b', borderWidth: 1, borderRadius: 16, justifyContent: 'center',
          alignItems: 'center', paddingTop: 6, paddingBottom: 10, paddingLeft: 6, paddingRight: 8
      }}>
          <Text style={{fontSize: 25, color: '#ddf1ff'}}> add item to tree </Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={ () => {this.plantTree()} } style={{flex: 1, height: 35, width: 200,
          backgroundColor: '#28593b', marginTop: 120, marginBottom: 120,
          borderColor: 'white', borderWidth: 3, borderRadius: 26, justifyContent: 'center',
          alignItems: 'center', paddingTop: 6, paddingBottom: 10, paddingLeft: 6, paddingRight: 8
      }}>
          <Text style={{fontSize: 25, color: '#ddf1ff'}}> plant tree! </Text>
        </TouchableOpacity>
      </View>

      </View>
    )
  }
}
// const AddTree = createStackNavigator(
//   {
//     // Map: {
//     //   screen: Map
//     // },
//     AddTree: {
//       screen: AddTreeScreen
//     }
//   }, {initialRouteName: 'AddTree'}
// )

//export default AddTree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7f2e2'
  }
});
