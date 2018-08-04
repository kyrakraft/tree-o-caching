import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';
import TakeItem from './TakeItem'

export default class TreeProfile extends React.Component {
  constructor(props) {
    super(props)
    const { navigation } = this.props
    const tree = navigation.getParam('tree', {})
    //alert(tree.items[0])
    console.log("profile treeeeeeeeeeeee", tree)
    this.state = {
      itemName: '',
      tree: tree,
    }

  }

  componentWillReceiveProps(nextProps) {
    console.log("nextttttttttttttttttttttttttttttttt", nextProps.navigation.state.params.tree)
    this.setState({
      tree: nextProps.navigation.state.params.tree
    })
  }

  componentDidMount(){
    axios.get('http://4afb1aa4.ngrok.io/getItem?itemId=' + this.state.tree.items[0])
    .then((resp) => {
      this.setState({
        itemName: resp.data.name
      })
    })
  }

  takeItem() {
    this.props.navigation.navigate('TakeItem', {itemName: this.state.itemName, itemId: this.state.tree.items[0], treeId: this.state.tree._id})
  }

  render() {

    return(
      <View style={styles.container}>
        <View style={{flex: 2, height: 70, width: 360, justifyContent: 'center', alignItems:'center',
          marginTop: 20, marginBottom: 50, marginLeft: 30, marginRight: 30,
          borderColor: 'white', borderWidth: 3, borderRadius: 6,
        paddingTop: 6, paddingBottom: 8, paddingLeft: 6, paddingRight: 6}}>
        <Text style={{fontSize: 20, marginBottom: 5, color: '#28593b', paddingTop: 9 }}> tree coordinates: </Text>
        <Text style={{fontSize: 15, marginBottom: 10, color: '#28593b' }}>
          ( {this.state.tree.longitude}, {this.state.tree.latitude} ) </Text>
        </View>

        <View style={{flex: 7, height: 50, width: 360, justifyContent: 'center', alignItems:'center',
          backgroundColor: '#d9e4fc', marginTop: 20, marginBottom: 30, marginLeft: 20, marginRight: 20,
          borderColor: 'white', borderWidth: 3, borderRadius: 26,
        paddingTop: 6, paddingBottom: 8, paddingLeft: 6, paddingRight: 6}}>
        <Text style={{fontSize: 35, marginBottom: 10, color: '#17313a', paddingTop: 20 }}> items in this tree: </Text>
        <TouchableOpacity>
          <Text style={{fontSize: 55, marginBottom: 10, color: '#17313a', fontFamily: 'ArialRoundedMTBold', marginBottom: 20 }}> {this.state.itemName} </Text>
        </TouchableOpacity>
        </View>

        <View style={{flex: 2, height: 50, width: 260, justifyContent: 'center', alignItems:'center',
          backgroundColor: '#28593b', marginTop: 40, marginBottom: 20, marginLeft: 50, marginRight: 50,
          borderColor: 'white', borderWidth: 3, borderRadius: 26,
        paddingTop: 6, paddingBottom: 8, paddingLeft: 6, paddingRight: 6}}>
        <TouchableOpacity>
          <Text style={{color: '#d9e4fc', fontSize: 20}}>
            ADD an item to this tree
          </Text>
        </TouchableOpacity>
        </View>

        <View style={{flex: 2, height: 50, width: 260, justifyContent: 'center', alignItems:'center',
          backgroundColor: '#28593b', marginTop: 20, marginBottom: 70, marginLeft: 50, marginRight: 50,
          borderColor: 'white', borderWidth: 3, borderRadius: 26,
        paddingTop: 6, paddingBottom: 8, paddingLeft: 6, paddingRight: 6}}>
        <TouchableOpacity
          onPress={(() => this.takeItem())}
          >
          <Text style={{color: '#d9e4fc', fontSize: 20}}>
            TAKE an item from this tree
          </Text>
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
