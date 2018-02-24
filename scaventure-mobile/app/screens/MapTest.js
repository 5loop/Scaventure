import React from 'react';
import { MapView } from 'expo';

export default class MapTest extends React.Component {
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 43.6532,
          longitude: -79.411079,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          coordinate={{latitude: 43.6532, longitude: -79.411079 }}

        />
      </MapView>
    );
  }
}

