import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Picker
} from 'react-native'
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';
import AddTree from './AddTree'
import TreeProfile from './TreeProfile'
import ViewOwnItems from './ViewOwnItems'

export default class TakeItem extends React.Component {
  constructor(props) {
    super(props)

    const { navigation } = this.props
    const itemName = navigation.getParam('itemName', '');
    const itemId = navigation.getParam('itemId', '')
    const treeId = navigation.getParam('treeId', '')

    this.state = {
      selectedItem: itemName,
      itemName: itemName,
      itemId: itemId,
      treeId: treeId
    }

  }

  componentDidMount(){
  }

  takeItem() {
    const {navigate} = this.props.navigation
    //alert('takeitem')
    axios.post('http://4afb1aa4.ngrok.io/viewTree/takeItem', {
        treeId: this.state.treeId,
        userId: '5b62420ef81f8651bed5c659',
        itemId: this.state.itemId
    })
    .then( async (res) => {
      //alert(res.data)
      //console.log("axios post take", res.data);

      await navigate('TreeProfile', {tree: res.data})


    })
    .catch(e => {
      console.log("erorrrrrrr", e)
      alert("ERROR")
    });


  }

  viewOwnItems(){
    //alert('hi')
    this.props.navigation.navigate('ViewOwnItems', {})
  }


  render() {
    // const { navigation } = this.props
    // const items = navigation.getParam('items', [])
    //alert(items)
    //alert(this.state.selectedItem)

    return(
      <View style={styles.container}>
        <View style={{flex: 2, height: 60, width: 250, justifyContent: 'center', alignItems:'center',
          marginTop: 40, marginBottom: 40, marginLeft: 80, marginRight: 80,
          //borderColor: 'white', borderWidth: 3, borderRadius: 6,
        paddingTop: 6, paddingBottom: 6, paddingLeft: 6, paddingRight: 6}}>
          <Text style={{color: '#28593b', fontSize: 25}}>select an item to take!</Text>
        </View>

        <View style={{flex: 13, justifyContent: 'center', alignItems: 'center', width: 360, height: 430, marginBottom: 70}}>
        <Picker
          selectedValue={this.state.selectedItem}
          style={{ flex: 1, height: '50%', width: '80%', marginLeft: 10, marginRight: 10,
          justifyContent: 'center',  backgroundColor: '#d9e4fc', borderColor: 'white',
          borderWidth: 3, borderRadius: 20, flex: 1}}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({selectedItem: itemValue})

            //alert(itemValue)
          }
        }>
          {/* {this.state.items.map((item, index) => {
            console.log("item", item)
            if(item !== null){ */}
            {/* return( */}

          <Picker.Item style={{ color: 'white'}} label={this.state.itemName} value={this.state.itemId} />

          {/* )} */}
          {/* })} */}
        </Picker>
        </View>

        <View style={{flex: 3, height: 60, width: 140, justifyContent: 'center', alignItems:'center',
          backgroundColor: '#28593b', marginTop: 20, marginBottom: 40, marginLeft: 90, marginRight: 90,
          borderColor: 'white', borderWidth: 3, borderRadius: 26,
        paddingTop: 6, paddingBottom: 8, paddingLeft: 6, paddingRight: 6}}>
        <TouchableOpacity
          onPress={() => (this.takeItem())}
          >
          <Text style={{fontSize: 25, color: '#ddf1ff'}}>take item</Text>
        </TouchableOpacity>
        </View>

        <View style={{flex: 3, height: 60, width: 140, justifyContent: 'center', alignItems:'center',
          backgroundColor: '#28593b', marginTop: 20, marginBottom: 50, marginLeft: 90, marginRight: 90,
          borderColor: 'white', borderWidth: 3, borderRadius: 26,
        paddingTop: 6, paddingBottom: 8, paddingLeft: 6, paddingRight: 6}}>
        <TouchableOpacity
          onPress={() => (this.viewOwnItems())}
          >
          <Text style={{fontSize: 15, color: '#ddf1ff'}}>view your items</Text>
        </TouchableOpacity>
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
