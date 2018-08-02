import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { createStackNavigator } from 'react-navigation';
import Map from './Map'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }

  mapPress() {
    this.props.navigation.navigate('Map')
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={{flex: 1, width: 300, height: 20}}>
          <Text style={{ color: '#28593b', fontSize: 25}}>
            welcome to tree-o-caching!
          </Text>
         </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems:'center', width: 60, height: 55}}>
        <TouchableOpacity onPress={ () => {this.mapPress()} } style={{flex: 1, height: 55, width: 70,
          backgroundColor: '#28593b', marginTop: 7, marginBottom: 210,
          borderColor: '#28593b', borderWidth: 1, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
        paddingTop: 6, paddingBottom: 10, paddingLeft: 6, paddingRight: 8
      }}>
          <Text style={{flex: 1, fontSize: 25, color: '#ddf1ff'}}> map </Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const Home = createStackNavigator(
  {
    Home: {
     screen: HomeScreen
   },
   Map: {
     screen: Map
   }
 }, {initialRouteName: 'Home'})

 export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7f2e2',
  }
});
