import React from 'react';
import { MapView } from 'expo';
import { View, Text, StyleSheet } from 'react-native';
/* -- Local Imports */
import AnnotatedButton from '../common/AnnotatedButton';
import Colors from '../../constants/colors';

export default class StepLocation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      markers: null,
    };

    this.mapRef = null;
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const stepLongitude = this.props.step.startLocation.coordinates[1];
        const stepLatitude = this.props.step.startLocation.coordinates[0];
    
        const arrayMarker = [
          { latitude: stepLatitude, longitude: stepLongitude }, 
          { latitude: position.coords.latitude, longitude: position.coords.longitude },
        ];

        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });

        if (this.mapRef && arrayMarker.length === 2 && arrayMarker[0].latitude && arrayMarker[1].latitude) {
          this.mapRef.fitToCoordinates(arrayMarker, { edgePadding: { top: 60, right: 60, bottom: 60, left: 60 }, animated: true });
        }
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    // step: steps[stepIndex], longitude: steps[stepIndex].startLocation.coordinates[1], latitude: steps[stepIndex].startLocation.coordinates[0] });

    // const { params } = this.props.navigation.state;
    const stepLongitude = this.props.step.startLocation.coordinates[1];
    const stepLatitude = this.props.step.startLocation.coordinates[0];

    const arrayMarker = [{ latitude: stepLatitude, longitude: stepLongitude }];
    
    if (this.state.latitude && this.state.longitude) {
      arrayMarker.push({ latitude: this.state.latitude, longitude: this.state.longitude });
    }

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.h1}>Step Start Location</Text>
        <MapView
          style={{ flex: 1, minWidth: 300, minHeight: 500 }}
          ref={(ref) => { this.mapRef = ref; }}
        >
          { this.state.latitude && this.state.longitude && 
            <MapView.Marker
              pinColor={Colors.primaryColor}
              coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
            />
          }
          <MapView.Marker
            coordinate={{ latitude: stepLatitude, longitude: stepLongitude }}
          /> 
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
