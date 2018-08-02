import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,

} from 'react-native'
import Map from './Map'
import { createStackNavigator } from 'react-navigation';

class AddTreeScreen extends React.Component {

  static navigationOptions = {
    title: 'AddTree'
  }

  newItem(){
    //fetch (post), then show user's items. to be implemented later.
  }

  addTree(){

    //fetch (post), then redirect to map
    // fetch('', {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    // .then((response) => (response.json()))
    // .then((responseJson) => (
    //   //something
    // ))
    // .catch((err) => {
    //   alert("error: ", err)
    //   });
    //
    // this.props.navigation.navigate('Map')

  }

  componentDidMount() {
    //console.log('hi')
  }

  render() {
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

          <Text style={{fontSize: 25, color: '#ddf1ff'}}> longitude: </Text>
          <Text style={{fontSize: 25, color: '#ddf1ff'}}> latitude: </Text>
          <Text style={{fontSize: 25, color: '#ddf1ff'}}> items in this tree: </Text>


        <TouchableOpacity style={{flex: 1, height: 35, width: 200,
          backgroundColor: '#28593b', marginTop: 20, marginBottom: 20,
          borderColor: '#28593b', borderWidth: 1, borderRadius: 16, justifyContent: 'center',
          alignItems: 'center', paddingTop: 6, paddingBottom: 10, paddingLeft: 6, paddingRight: 8
      }}>
          <Text style={{fontSize: 25, color: '#ddf1ff'}}> add item to tree </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 1, height: 35, width: 200,
          backgroundColor: '#28593b', marginTop: 20, marginBottom: 20,
          borderColor: '#28593b', borderWidth: 1, borderRadius: 16, justifyContent: 'center',
          alignItems: 'center', paddingTop: 6, paddingBottom: 10, paddingLeft: 6, paddingRight: 8
      }}>
          <Text style={{fontSize: 25, color: '#ddf1ff'}}> plant your new virutal tree! </Text>
        </TouchableOpacity>

      </View>
    )
  }
}
const AddTree = createStackNavigator(
  {
    // Map: {
    //   screen: Map
    // },
    AddTree: {
      screen: AddTreeScreen
    }
  }, {initialRouteName: 'AddTree'}
)

export default AddTree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7f2e2'
  }
});
