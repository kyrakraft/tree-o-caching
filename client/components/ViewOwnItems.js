import React from 'react';
import { PanResponder, Animated, StyleSheet, Text, View } from 'react-native';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
// import Expo from 'expo';
console.disableYellowBox = true;
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY()
    };
  }
  componentWillMount() {
    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ])
    });
    // adjusting delta value
    this.state.pan.setValue({ x:0, y:0})
  }
  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View
          //this is the key for panResponder
          {...this.panResponder.panHandlers}
          style={[panStyle, { width: 200, height: 200 }]}
        >
          <Expo.GLView
            style={{ flex: 1 }}
            onContextCreate={this._onGLContextCreate}
          />
        </Animated.View>
        <Animated.View
          //this is the key for panResponder
          {...this.panResponder.panHandlers}
          style={[panStyle, { width: 200, height: 200 }]}
        >
          <Expo.GLView
            style={{ flex: 1 }}
            onContextCreate={this._onGLContextCreate}
          />
        </Animated.View>
      </View>
    );
  }
  _onGLContextCreate = async (gl) => {
    // Do graphics stuff here!
    const scene = new THREE.Scene();
    //scene = new THREE.Scene({antialias:true});
        //scene.background = new THREE.FogExp2( 0x000000, 0.0003 );
    const camera = new THREE.PerspectiveCamera(
      75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    // const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    // camera.position.z = 10;
    const geometry = new THREE.SphereGeometry( 1, 8, 6 );
    //const geometry = new THREE.SphereBufferGeometry(1, 8, 6, 0, Math.PI, 0, Math.PI);
    const material = new THREE.MeshBasicMaterial( {color: 0xccff66} );
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    camera.position.z = 3;
    //var starsGeometry = new THREE.Geometry();
    // const geometry = new THREE.SphereGeometry(1, 8, 6);
    // const materialOptions = {
      //        size: 2.0, //I know this is the default, it's for you.  Play with it if you want.
      //        transparency: true,
      //        opacity: 0.7,
        //          color: '#'+Math.floor(Math.random()*16777215).toString(16),
      //    };
    //
      // const starStuff = new THREE.PointCloudMaterial(materialOptions);
    //
    // for ( var i = 0; i < 45000; i ++ ) {
    //
    //  var star = new THREE.Vector3();
    //  star.x = THREE.Math.randFloatSpread( 2000 );
    //  star.y = THREE.Math.randFloatSpread( 2000 );
    //  star.z = THREE.Math.randFloatSpread( 2000 );
    //
    //  starsGeometry.vertices.push( star );
    //
    // }
    //
    // var starsMaterial = new THREE.PointsMaterial( {
    //   color: '#'+Math.floor(Math.random()*16777215).toString(16)
    // } );
    //
    // var starField = new THREE.Points( starsGeometry, starsMaterial );
    //
    // scene.add( starField );
    const animate = () => {
      requestAnimationFrame(animate);
      // cube.rotation.x += 0.07;
      // cube.rotation.y += 0.04;
      sphere.rotation.x += 0.04;
      sphere.rotation.y += 0.04;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }
    animate();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// import React from 'react'
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity
// } from 'react-native'
// import { createStackNavigator } from 'react-navigation';
// import axios from 'axios';
// import TakeItem from './TakeItem'
//
// export default class ViewOwnItems extends React.Component {
//   constructor(props) {
//     super(props)
//
//   }
//
//   componentDidMount(){
//   }
//
//
//   render() {
//
//     return(
//       <View style={styles.container}>
//         <Text>hello</Text>
//       </View>
//     )
//   }
// }
//
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#d7f2e2',
//   }
// });
