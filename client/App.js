import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home'
import Map from './components/Map'
import { createStackNavigator } from 'react-navigation';
import AddTree from './components/AddTree'
import TreeProfile from './components/TreeProfile'
import TakeItem from './components/TakeItem'
import ViewOwnItems from './components/ViewOwnItems'

// class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Home style={{width: '100%', height: '100%'}}/>
//         {/* <Map style={{width: '100%', height: '100%'}}/> */}
//       </View>
//     );
//   }
// }


export default App = createStackNavigator(
  {

    Home: {
      screen: Home
    },
    Map: {
      screen: Map
    },
    AddTree: {
      screen: AddTree
    },
    TreeProfile: {
      screen: TreeProfile
    },
    TakeItem: {
      screen: TakeItem
    },
    ViewOwnItems: {
      screen: ViewOwnItems
    }
  }, {initialRouteName: 'Home'}
)

// export default StackNavigator({
//   Home: {
//     screen: HomeScreen
//   },
//   Map: {
//     screen: MapScreen
//   }
// }, {initialRouteName: 'Home'});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d7f2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
