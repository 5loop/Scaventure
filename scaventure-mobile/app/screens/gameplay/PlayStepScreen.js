import React from 'react';
import { MapView } from 'expo';
import { Text, View, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

/** -- Local Imports */
import Colors from '../../constants/colors';
import StepLocation from './StepLocation';

/* - Step Imports */
import QAStep from './QAStep';
import QRStep from './QRStep';
import GPSStep from './GPSStep';

class PlayStep extends React.Component { 
  constructor(props, context) {
    super(props, context);

    const { steps, stepIndex } = this.props.navigation.state.params;

    this.state = {
      initialStepPoints: steps[stepIndex].points, // points assigned to the step
      points: steps[stepIndex].points, // points earned by the user
      hintsUsed: 0, // 
      displayOverlay: false, // display 'check answer' overlay
      displayMap: true, 
      answerCorrect: false,
    };
  }

  // For QR Step
  onSelect(index) {
    this.setState({ index });
  }

  /**
   * Handle Step completion here
   */
  handleNextStep() {
    const { steps, stepIndex } = this.props.navigation.state.params;
    let { totalScore = 0 } = this.props.navigation.state.params;
    const { points } = this.state;
    totalScore += points;

    // Check if user completed the game
    if (steps.length !== stepIndex + 1) {
      // Navigate to the next step
      this.props.navigation.navigate('PlayStep', { steps, stepIndex: stepIndex + 1, totalScore });
    } else {
      console.warn("You Completed the Game!");
    }
  }

  // Map Overlay - close
  closeMap() {
    this.setState({ displayMap: false });
  }

  // Map Overlay - open
  openMap() {
    this.setState({ displayMap: true });
  }

  /**
   *  Specify logic for checking answer (QA, QR, GPS)
   */
  checkAnswer() {
    const { steps, stepIndex } = this.props.navigation.state.params;
    let answerCorrect = false;
    let newScore = this.state.points;

    if (steps[stepIndex].type === 'QAStep') {
      if (this.state.index === steps[stepIndex].answer) {
        answerCorrect = true;
      } else {
        const pointsDeducted = Math.round(this.state.initialStepPoints / 4);
        if ((newScore - pointsDeducted) >= 0) {
          newScore -= pointsDeducted;
        } else {
          newScore = 0;
        }
      }
    } else if (steps[stepIndex].type === 'QRStep') {
      console.warn("Logic for QR  -> To be Implemented");
    } else if (steps[stepIndex].type === 'GPSStep') {
      console.warn("Logic for GPS -> To Be Impelemtned");
    }

    this.setState({ displayOverlay: true, answerCorrect, points: newScore });
  }
  
  render() {
    // get current step
    const { steps, stepIndex } = this.props.navigation.state.params;
    
    let Step = null;
    if (steps[stepIndex].type === 'QAStep') {
      Step = <QAStep step={steps[stepIndex]} onSelect={this.onSelect.bind(this)} />;
    } else if (steps[stepIndex].type === 'QRStep') {
      Step = <QRStep step={steps[stepIndex]} />; // pass any props here
    } else if (steps[stepIndex].type === 'GPSStep') {
      Step = <GPSStep step={steps[stepIndex]} />;
    }

    return (
      <View style={styles.container}> 
        
        {/* Render Specific Step-type Description/Question */}
        { Step }   

        {/* Check Answer */}
        <TouchableHighlight style={styles.button} onPress={this.checkAnswer.bind(this)}>
          <Text style={styles.buttonText}>Check</Text>
        </TouchableHighlight> 
        
        {/* Display current step score */}
        <View style={styles.gameCard}>
          <Text style={styles.scoreText}>Score</Text>
          <Text style={styles.h1}>{this.state.points}</Text>
        </View>

        {/* Button to open-up a map */}       
        <View style={styles.mapIcon}>
          <Text style={styles.h1}>Map</Text>
          <TouchableHighlight onPress={this.openMap.bind(this)}>
            <Feather name="map-pin" size={35} color={Colors.white} />
          </TouchableHighlight>
        </View>

        {/* Map Overlay */}
        { this.state.displayMap &&
          <View style={styles.overlay}> 
            <StepLocation closeMap={this.closeMap.bind(this)} step={steps[stepIndex]} /> 
          </View>
        }
        {/* Overlay -> displayed when answer is submitted - either correct or false */}
        { this.state.displayOverlay && 
          (this.state.answerCorrect 
            ? 
            <TouchableWithoutFeedback onPress={this.handleNextStep.bind(this)} accessible={false}>
              <View style={styles.overlay}> 
                <Text style={styles.h1}>Correct: +{this.state.points} points</Text>
                <Feather name='check' size={60} color={Colors.lightSecondary} /> 
              </View>
            </TouchableWithoutFeedback>
            :
            <TouchableWithoutFeedback onPress={() => this.setState({ displayOverlay: false })} accessible={false}>            
              <View style={styles.overlay}> 
                <Text style={[styles.h1, { color: 'red' }]}>Wrong: -2 points</Text>
                <Feather name='x' size={60} color={Colors.lightSecondary} />
              </View>  
            </TouchableWithoutFeedback>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                           
    backgroundColor: Colors.primaryColor,          
    padding: 18,
  },
  actionContainer: {
    flex: 1,                           
    backgroundColor: Colors.darkPrimary, 
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
  description: {
    minHeight: 170,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.secondaryColor,
    borderBottomWidth: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  gameCard: {
    position: 'absolute',
    marginBottom: 20,
    marginRight: 20,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.lightSecondary,
    padding: 8,
  },
  mapIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 20,
    bottom: 0,
    left: 0,
    padding: 8,
  },
  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primaryColor,
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
  overlay: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'stretch',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.darkPrimary,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayStep;
