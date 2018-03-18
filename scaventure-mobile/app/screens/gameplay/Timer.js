import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  h1: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
});

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
    };
  }

  componentDidMount() {
    // componentDidMount is called by react when the component 
    // has been rendered on the page. We can set the interval here:

    this.timer = setInterval(this.tick.bind(this), 50);
  }

  componentWillUnmount() {
    // This method is called immediately before the component is removed
    // from the page and destroyed. We can clear the interval here:

    clearInterval(this.timer);
  }

  tick() {
    // This function is called every 50 ms. It updates the 
    // elapsed counter. Calling setState causes the component to be re-rendered

    if (this.props.start) {
      this.setState({ elapsed: new Date() - this.props.start });
    }
  }

  render() {
    // Calculate elapsed to tenth of a second:
    const elapsed = Math.round(this.state.elapsed / 100);

    // This will give a number with one digit after the decimal dot (xx.x):
    const seconds = (elapsed / 10).toFixed(1);    

    // Although we return an entire <p> element, react will smartly update
    // only the changed parts, which contain the seconds variable.
    //  This example was started {seconds} seconds< ago. 
    return <Text style={styles.h1}>{seconds} sec</Text>;
  }
}
