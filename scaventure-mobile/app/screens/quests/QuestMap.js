import React from 'react';
import { MapView } from 'expo';
import { View, Text, StyleSheet } from 'react-native';
/* -- Local Imports */
import AnnotatedButton from '../common/AnnotatedButton';
import Colors from '../../constants/colors';

const edgePadding = { top: 60, right: 60, bottom: 60, left: 60 };

export default class QuestMap extends React.Component {

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
    /*
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
    */
  }

  fitMarkers() {
    if (this.props.coordinates.length !== 0 && this.mapRef) {
      this.mapRef.fitToCoordinates(
        this.props.coordinates.map((c) => ({ latitude: c.latlng.latitude, longitude: c.latlng.longitude })), 
        { edgePadding, animated: false }
      ); 
    }
  }

  render() {
    const arrayMarker = this.props.coordinates;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1, minWidth: 300, minHeight: 500 }}
          ref={(ref) => { this.mapRef = ref; }}
          onLayout={this.fitMarkers.bind(this)}
        >
          { arrayMarker.map(marker => 
            (<MapView.Marker
              coordinate={marker.latlng}
              title={marker.title}
              key={marker.title + marker.latlng.latitude + marker.latlng.longitude}
            />)
          )}

        </MapView>
        <AnnotatedButton onPress={this.props.closeMap} icon='list' buttonText="View Quest List" />
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
