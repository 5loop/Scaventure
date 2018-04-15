import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

/** -- Local Imports */
import Colors from '../../constants/colors';

export default class QRStep extends React.Component {

  state = {
    start: new Date(),
    elapsed: (new Date()).setSeconds((new Date()).getSeconds() - 1),
    showBackup: false,
  }

  componentDidMount() {
    if (this.props.step.backupEnabled) {
      this.timer = setInterval(this.tick.bind(this), 50);
    }
  }

  componentWillUnmount() {
    if (this.props.step.backupEnabled) {
      clearInterval(this.timer);
    }
  }

  tick() {
    const timePassed = new Date() - this.state.start;
    const elapsed = Math.round(timePassed / 100);
    const seconds = (elapsed / 10);

    if (seconds >= (10)) { // 10 minutes passed
      this.setState({ showBackup: true });
      this.props.showBackupOption();
    }

    this.setState({ elapsed: timePassed });
  }

  render() {
    return (
      <View>
        <Text style={styles.h1}>{ this.props.step.description }</Text> 
        { (this.props.step.backupEnabled && this.state.showBackup) &&
          <Text style={styles.h1}>Can't find a QR? You can use 'Check GPS' option instead of QR which wil test if you reached the desired step location!</Text>
        }
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
});
