import React from 'react';
import { MapView } from 'expo';
import { View, Text, StyleSheet, Image } from 'react-native';
/* -- Local Imports */
import AnnotatedButton from '../common/AnnotatedButton';
import Colors from '../../constants/colors';

const qrPin = require('../../../assets/images/qrPin.png');
const gpsPin = require('../../../assets/images/gpsPin.png');
const qaPin = require('../../../assets/images/qaPin.png');


export default class StepLocation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      markers: null,
      extraData: false
    };

    this.mapRef = null;
  }

  componentDidMount() {
    let self = this
    setTimeout(()=>self.setState({ extraData: true }), 100);
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const stepLongitude = this.props.step.startLocation.coordinates[0];
        const stepLatitude = this.props.step.startLocation.coordinates[1];
    
        const arrayMarker = [
          { latitude: stepLatitude, longitude: stepLongitude, title: 'Step Location' }, 
          { latitude: position.coords.latitude, longitude: position.coords.longitude, title: 'Your Location' },
        ];

        if (this.mapRef && arrayMarker.length === 2 && arrayMarker[0].latitude && arrayMarker[1].latitude) {
          this.mapRef.fitToCoordinates(arrayMarker, { 
            edgePadding: { top: 80, right: 80, bottom: 80, left: 80 }, animated: false, 
          });
        }
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    // step: steps[stepIndex], longitude: steps[stepIndex].startLocation.coordinates[1], latitude: steps[stepIndex].startLocation.coordinates[0] });

    // const { params } = this.props.navigation.state;
    const stepLongitude = this.props.step.startLocation.coordinates[0];
    const stepLatitude = this.props.step.startLocation.coordinates[1];
    console.log(this.props.step.startLocation);

    // TODO: Try commenting this out (seems redundundant)
    const arrayMarker = [{ latitude: stepLatitude, longitude: stepLongitude }];
    
    if (this.state.latitude && this.state.longitude) {
      arrayMarker.push({ latitude: this.state.latitude, longitude: this.state.longitude });
    }

    let pin = {};
    let img = {};
    if (this.props.step.type === 'GPSStep') {
      pin = require('../../../assets/images/gpsPin.png');
      img = (<Image 
        source={require('../../../assets/images/gpsPin.png')} 
        key={`${this.state.extraData}`}
      />);
    } else if (this.props.step.type === 'QAStep') {
      pin = require('../../../assets/images/qaPin.png');
      img = (<Image 
        source={require('../../../assets/images/qaPin.png')} 
        key={`${this.state.extraData}`}
      />);
    } else {
      pin = require('../../../assets/images/qrPin.png');
    }

    const initialPosition = {
      latitude: stepLatitude, 
      longitude: stepLongitude,
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
    };

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.h1}>Step Start Location</Text>
        <MapView
          style={{ flex: 1, minWidth: 300, minHeight: 500 }}
          ref={(ref) => { this.mapRef = ref; }}
          initialRegion={initialPosition}
          
          followsUserLocation
          showsUserLocation
        >

          <MapView.Marker
            coordinate={{ latitude: stepLatitude, longitude: stepLongitude }}
            title={'Start Location'}
            description={'Please, move here first!'}
          >
            {img}
          </MapView.Marker>  
        </MapView>
        <AnnotatedButton onPress={this.props.closeMap} icon='flag' buttonText="View Step Description" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    margin: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
});
