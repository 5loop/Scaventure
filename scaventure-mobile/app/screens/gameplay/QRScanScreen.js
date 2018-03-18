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
    // correctBarcode: this.props.steps.qrCode // get the correct barcode from steps id
    correctBarcode: 'exp://rk-fzf.yli40.scaventure-mobile.exp.direct:80', // for testing
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
      <View>
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

  _handleBarcode = () => {
    // check if the barcode matches.
    if (this.state.lastScannedUrl == this.state.correctBarcode) {
      // this.props.navigation.goBack(null);
      Alert.alert("match successful.") // for testing
    } else {
      Alert.alert(
        'Barcode not matching!',
        this.state.lastScannedUrl,
        [
          { text: 'Ok', onPress: () => {this.setState({ lastScannedUrl: null })} },
        ],
        { cancellable: false }
      );
    }
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }
    
    return (
      this._handleBarcode()
    );
  };
}
