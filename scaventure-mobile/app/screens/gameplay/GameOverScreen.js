import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/** -- Local Imports */
import Colors from '../../constants/colors';
import { saveProgress } from '../../actions/questActions';

class GaveOverScreen extends React.Component { 

  componentDidMount() {
    const { totalScore = 0, totalElapsed = 0, questId } = this.props.navigation.state.params;
    
    const elapsed = Math.round(totalElapsed / 100);
    const seconds = (elapsed / 10).toFixed(1); 
    
    this.props.saveProgress({
      _questId: questId,
      timeTaken: seconds,
      pointsEarned: totalScore,
    }).then(() => {

    }).catch(e => console.log("error") );
  }

  render() {
    const { totalScore = 0, totalElapsed = 0 } = this.props.navigation.state.params;

    // Calculate elapsed to tenth of a second:
    const elapsed = Math.round(totalElapsed / 100);
        
    // This will give a number with one digit after the decimal dot (xx.x):
    const seconds = (elapsed / 10).toFixed(1);   

    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Total Score: {totalScore}</Text>
        <Text style={styles.h1}>Time Taken:  {seconds} seconds</Text>
        <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('PublicQuests')}>
          <Text style={styles.buttonText}>OK!</Text>
        </TouchableHighlight> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                           
    backgroundColor: Colors.primaryColor,          
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
  button: {
    height: 40,
    borderColor: Colors.lightSecondary,
    width: 80,
    borderWidth: 2,
    margin: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.lightSecondary,
    fontSize: 20,
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveProgress }, dispatch);
}

export default connect(null, mapDispatchToProps)(GaveOverScreen);
