import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';
import { TextField } from 'react-native-material-textfield';
import MapView from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { editStep } from '../../actions/questActions';
import CheckBox from 'react-native-check-box';

import {
  Alert,
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
} from 'react-native';

/** -- Local Imports */
import Colors from '../../constants/colors';
import MapButton from '../common/MapButton';
import AnnotatedButton from '../common/AnnotatedButton';

import { addStep } from '../../actions/questActions';
 
class EditQRsteps extends Component {
  constructor(props){
    super(props)
    const { step } = this.props.navigation.state.params;
    var p = (step.points).toString();
    this.state = {
    text: step.qrCode,
    description: step.description,
    hint: step.stepHint,
    displayMap: false,
    displayMapBackup: false,
    backupEnabled: false,
    initialPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
  }
  };

  componentWillMount(){
    const { step } = this.props.navigation.state.params;
      if(step)
      this.setDefaultState(step);
  }

  componentWillReceiveProps(nextProps){
    this.setDefaultState(nextProps);
}

    setDefaultState(step){
        var p = (step.points).toString();
        var initialRegion = {
            latitude: step.startLocation.coordinates[1],
            longitude: step.startLocation.coordinates[0],
            latitudeDelta: 0.09,
            longitudeDelta: 0.09,
          }         
        this.setState({
          text: step.qrCode,
          description: step.description,
          hint: step.stepHint,
            initialPosition: initialRegion,
            markerPosition: initialRegion
        })
    }

  /*componentDidMount() {    
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
  }*/

  btnPressed = () => {
    const { step } = this.props.navigation.state.params;
    const { text, description, backupEnabled } = this.state;

    if (!text || (text && text.trim() === '')) {
      Alert.alert('Alert', 'Your answer cannot be empty.');
    } else if (!description || (description && description.trim() === '')) {
      Alert.alert('Alert', 'Description cannot be empty.');
    } else {
      let startLocation = {};
      let stepLocation = {};

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

      if (this.state.bx === undefined) {
        stepLocation = {       
          type: 'Point', 
          coordinates: [this.state.initialPosition.longitude, this.state.initialPosition.latitude],
        };
      } else {
        stepLocation = {       
          type: 'Point', 
          coordinates: [this.state.bx.longitude, this.state.bx.latitude],
        };
      }

      const data = {
        description,
        startLocation,
        stepLocation,
        points: 10,
        qrCode: text,
        stepHint: this.state.hint,
        backupEnabled,
      };

      this.props.editStep(step._id, step.questId, data).then(() => {
        this.props.navigation.goBack();
      });
    }
  }

  closeMap = () => this.setState({ displayMap: false });
  openMap = () => this.setState({ displayMap: true });

  closeMapBackup = () => this.setState({ displayMapBackup: false });
  openMapBackup = () => this.setState({ displayMapBackup: true });

  render() {
    const { step } = this.props.navigation.state.params;
    let { description } = this.state;
    let { hint } = this.state;
    let { answer } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView style={styles.container}>
            <TextField
              label='Description'
              value={description}
              baseColor={Colors.secondaryColor}
              tintColor={Colors.primaryColor}
              onChangeText={(description) => this.setState({ description })}
              multiline
              characterRestriction={300}
              maxLength={300}
              style={{ width: 400 }}
            />
            <TextField
              label='Hint (optional)'
              value={hint}
              baseColor={Colors.secondaryColor}
              tintColor={Colors.primaryColor}
              onChangeText={(hint) => this.setState({hint})}
            />
            <TextField
              label='Answer'
              value={answer}
              baseColor={Colors.secondaryColor}
              tintColor={Colors.primaryColor}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
              characterRestriction={100}
              maxLength={100}
            />
            <View style={styles.qrStyle}> 
              <QRCode
                value={this.state.text}
                size={200}
                bgColor='purple'
                fgColor='white'
              />
            </View>
            <CheckBox 
              style={{ flex: 1, padding: 10 }}
              rightText={"Enable Backup Location"}
              onClick={() => this.setState({ backupEnabled: !this.state.backupEnabled })}
              isChecked={this.state.backupEnabled}
            />
            <View style={{ flexDirection: 'row' }}>
              <MapButton 
                text={'Step Start Location'}
                onPress={this.openMap.bind(this)}
              />   

              {this.state.backupEnabled && 
                <View
                  style={{
                    borderColor: Colors.lightSecondary,
                    borderLeftWidth: 1,
                    marginLeft: 6,
                    marginRight: 6,
                  }} 
                />
              }

              {this.state.backupEnabled &&                 
                <MapButton 
                  text={'Backup GPS Location for QR'}
                  onPress={this.openMapBackup.bind(this)}
                /> 
              }  

            </View>
            <View>
              <TouchableHighlight 
                style={styles.button} 
                onPress={this.btnPressed.bind(this)}
                underlayColor={Colors.darkPrimary}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        {/* Map Overlay - Step Location */}
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
                  this.setState({ x: e.nativeEvent.coordinate });
                }}
                region={this.state.coordinate}
              />
            </MapView>
            <AnnotatedButton 
              color={Colors.green}
              onPress={this.closeMap.bind(this)} 
              icon='check' 
              buttonText="Done!" 
            />
          </View>
        }
        {/* Map Overlay - Step Backup Location */}
        { this.state.displayMapBackup &&
          <View style={styles.overlay}> 
            <MapView
              style={styles.map}
              region={this.state.initialPosition}
              initialRegion={this.state.initialPosition}
            >
              <MapView.Marker
                draggable
                coordinate={this.state.initialPosition}
                onDragEnd={(e) => {
                  this.setState({ bx: e.nativeEvent.coordinate });
                }}
                region={this.state.coordinate}
              />
            </MapView>
            <AnnotatedButton 
              color={Colors.green}
              onPress={this.closeMapBackup.bind(this)} 
              icon='check' 
              buttonText="Done!" 
            />
          </View>
        }
      </View>
    );
  }
}
/* 
  <TouchableHighlight> 
    <Text style={styles.buttonText} onPress={this.closeMap.bind(this)}>Close Map</Text> 
  </TouchableHighlight> 
  */
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: 'white',
    height: 400,
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
    margin: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
  },
  map: {
    minWidth: 340, 
    minHeight: 500,
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editStep }, dispatch);
}

export default connect(null, mapDispatchToProps)(EditQRsteps);
