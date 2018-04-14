import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';
import { TextField } from 'react-native-material-textfield';
import MapView from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import {
  Alert,
  Text,
  Button,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
} from 'react-native';

/** -- Local Imports */
import Colors from '../../constants/colors';
import { addStep } from '../../actions/questActions';
 
class QRsteps extends Component {
  state = {
    text: 'default_text',
    displayMap: false,
    initialPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
  };

  componentDidMount() {    
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = parseFloat(position.coords.latitude);
      let long = parseFloat(position.coords.longitude);

      const initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      };

      this.setState({ initialPosition: initialRegion });
      this.setState({ markerPosition: initialRegion });
      
    }, (error) => alert(JSON.stringify(error)),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });

    this.watchID  
  }

  btnPressed = () => {
    const { quest } = this.props.navigation.state.params;
    const { text, description } = this.state;

    if (!text || (text && text.trim() === '')) {
      Alert.alert('Alert', 'Your answer cannot be empty.');
    } else if (!description || (description && description.trim() === '')) {
      Alert.alert('Alert', 'Description cannot be empty.');
    } else {
      let startLocation = {};

      if (this.state.x === undefined) {
        startLocation = {       
          type: 'Point', 
          coordinates: [this.state.initialPosition.longitude, this.state.initialPosition.latitude],
        };
      } else {
        startLocation = {       
          type: 'Point', 
          coordinates: [this.state.x.longitude, this.state.x.latitude],
        };
      }

      const data = {
        description,
        startLocation,
        stepLocation: startLocation,
        points: 10,
        //stepNumber: 0,
        qrCode: text,
        stepHint: this.state.hint,

      };

      this.props.addStep('qr', quest._id, data).then(() => {
        this.props.navigation.goBack();
      });
    }
  }

  // Map Overlay - close
  closeMap() {
    this.setState({ displayMap: false });
  }

  // Map Overlay - open
  openMap() {
    this.setState({ displayMap: true });
  }
 
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <TextField
            label='Description'
            baseColor={Colors.secondaryColor}
            tintColor={Colors.primaryColor}
            onChangeText={(description) => this.setState({ description })}
            multiline
            characterRestriction={300}
            maxLength={300}
            style={{ width: 400 }}
          />
          <TextField
            label='Answer'
            baseColor={Colors.secondaryColor}
            tintColor={Colors.primaryColor}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            characterRestriction={100}
            maxLength={100}
          />
          <TextField
            label='Hint'
            baseColor={Colors.secondaryColor}
            tintColor={Colors.primaryColor}
            onChangeText={(hint)=> this.setState({hint})}
            
            />

          <View style={styles.qrStyle}> 
            <QRCode
              value={this.state.text}
              size={200}
              bgColor='purple'
              fgColor='white'
            />
          </View>
          <View>
            <TouchableHighlight style={styles.button}>
              <Text style={styles.buttonText} onPress={this.btnPressed.bind(this)}>Add New</Text>
            </TouchableHighlight>
          </View>
          {/* Button to open-up a map */}       
          <View>
            <Text style={styles.h1}>Map</Text>
            <TouchableHighlight onPress={this.openMap.bind(this)}>
              <Feather name="map-pin" size={35} color={Colors.black} />
            </TouchableHighlight>
          </View>

          {/* Map Overlay */}
          { this.state.displayMap &&
            <View style={styles.overlay}> 
              <MapView
                closeMap={this.closeMap.bind(this)}
                style={styles.map}
                region={this.state.initialPosition}
                initialRegion={this.state.initialPosition}
              >
                <MapView.Marker
                  draggable
                  coordinate={this.state.initialPosition}
                  onDragEnd={(e) => {
                    this.setState({ x: e.nativeEvent.coordinate,  initialPosition: e.nativeEvent.coordinate });
                  }}
                  region={this.state.coordinate}
                />
              </MapView>
              <TouchableHighlight> 
                <Text style={styles.buttonText} onPress={this.closeMap.bind(this)}>Close Map</Text> 
              </TouchableHighlight> 
            </View>
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: 'white',
  },
  qrStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  button: {
    height: 38,
    borderRadius: 18,
    backgroundColor: Colors.tertiaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
  },
  map: {
    minWidth: 300, 
    minHeight: 500,
    flex:1,
    flexDirection: 'column',
    
  },
  mapIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 20,
    bottom: 0,
    left: 0,
    padding: 8,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'stretch',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.darkPrimary,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addStep }, dispatch);
}

export default connect(null, mapDispatchToProps)(QRsteps);
