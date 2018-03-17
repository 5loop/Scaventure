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
    };
  }

  viewStep() {
    //this.props.navigation.goBack();
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
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
   
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.h1}>Step Start Location</Text>
        <MapView
          style={{ flex: 1, minWidth: 300, minHeight: 500 }}
          initialRegion={{
            latitude: stepLatitude,
            longitude: stepLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/*
            <MapView.Marker
              coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
            />
          */}
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
