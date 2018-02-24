import React from 'react';
import { MapView } from 'expo';

export default class QuestLocation extends React.Component {
  render() {
    const {params} = this.props.navigation.state;
   
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: params.latitude,
          longitude: params.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          coordinate={{latitude: params.latitude, longitude: params.longitude }}

        />
      </MapView>
    );
  }
}

