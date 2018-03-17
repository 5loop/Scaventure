import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class QRScanScreen extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()}
      </View>
    );
  }

  _handleWrongBarcode = () => {
    Alert.alert(
      'Barcode not matching!',
      this.state.lastScannedUrl,
      [
        { text: 'Ok', onPress: () => {this.setState({ lastScannedUrl: null })} },
      ],
      { cancellable: false }
    );
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      // check if the barcode matches.
      return;
    }

    return (
      this._handleWrongBarcode()
    );
  };
}
