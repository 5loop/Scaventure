import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import geolib from 'geolib';
/** -- Local Imports */
import Colors from '../../constants/colors';
import StepLocation from './StepLocation';
import AnnotatedButton from '../common/AnnotatedButton';

/* - Step Imports */
import QAStep from './QAStep';
import QRStep from './QRStep';
import GPSStep from './GPSStep';
import QRScanScreen from './QRScanScreen';
import Timer from './Timer';

class PlayStep extends React.Component { 
  constructor(props, context) {
    super(props, context);

    const { steps, stepIndex } = this.props.navigation.state.params;

    this.state = {
      initialStepPoints: steps[stepIndex].points, // points assigned to the step
      points: steps[stepIndex].points, // points earned by the user
      
      displayOverlay: false, // display 'check answer' overlay
      displayMap: true, 
      displayCamera: false,
      answerCorrect: false,
      start: Date.now(),
      index: 0,
      hintUsed: false, 
      displayHintOverlay: false,
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
    let { totalScore = 0, totalElapsed = 0 } = this.props.navigation.state.params;
    const { points } = this.state;
    totalScore += points;
    totalElapsed += (new Date() - this.state.start);

    // Check if user completed the game
    if (steps.length !== stepIndex + 1) {
      // Navigate to the next step
      this.props.navigation.navigate('PlayStep', { steps, stepIndex: stepIndex + 1, totalScore, totalElapsed });
    } else {
      this.props.navigation.navigate('GameOver', { totalScore, totalElapsed, questId: steps[stepIndex].questId });
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

  deductPoints() {
    let newScore = this.state.points;

    const pointsDeducted = Math.round(this.state.initialStepPoints / 4);
    if ((newScore - pointsDeducted) >= 0) {
      newScore -= pointsDeducted;
    } else {
      newScore = 0;
    }
    return newScore;
  }

  checkQr(scannedCode) {
    const { steps, stepIndex } = this.props.navigation.state.params;
    let answerCorrect = false;
    let newScore = this.state.points;

    if (steps[stepIndex].qrCode === scannedCode) { 
      answerCorrect = true;
    } else {
      newScore = this.deductPoints();
    }

    this.setState({ displayCamera: false, displayOverlay: true, answerCorrect, points: newScore });
  }

  checkGPS() {
    const { steps, stepIndex } = this.props.navigation.state.params;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoord = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        const distance = geolib.getDistance(
          userCoord,
          { 
            longitude: steps[stepIndex].stepLocation.coordinates[0], 
            latitude: steps[stepIndex].stepLocation.coordinates[1],
          }
        );

        let answerCorrect = false;
        let newScore = this.state.points;

        if (distance <= steps[stepIndex].radius) {
          answerCorrect = true;
        } else {
          newScore = this.deductPoints();
        }
  
        this.setState({ displayOverlay: true, answerCorrect, points: newScore });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
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
        newScore = this.deductPoints();
      }

      this.setState({ displayOverlay: true, answerCorrect, points: newScore });
    } else if (steps[stepIndex].type === 'QRStep') {
      this.setState({ displayCamera: true });
    } else if (steps[stepIndex].type === 'GPSStep') {
      this.checkGPS();
    }
  }
  
  /* Show hint */
  showHint = () => { 
    if (!this.state.hintUsed) {
      const newScore = this.deductPoints();
      this.setState({ hintUsed: true, displayHintOverlay: true, points: newScore });
    } else {
      this.setState({ displayHintOverlay: true });
    }
  };
  
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

        <View style={{ flex: 1, flexDirection: 'row' }}>
          {/* Check Answer */}
          <TouchableHighlight style={styles.button} onPress={this.checkAnswer.bind(this)}>
            <Text style={styles.buttonText}>Check</Text>
          </TouchableHighlight> 
          { steps[stepIndex].stepHint.trim() !== '' &&
            <TouchableHighlight style={styles.button} onPress={this.showHint.bind(this)}>
              <Text style={styles.buttonText}>Hint</Text>
            </TouchableHighlight> 
          }
        </View>

        {/* Display current step score & timer */}
        <View style={styles.gameCard}>
          <View style={styles.gameCardElement}>
            <Text style={styles.scoreText}>Time <Timer start={this.state.start} /></Text>
          </View>
          <View style={styles.gameCardElement}>
            <Text style={styles.scoreText}>Score <Text style={styles.score}>{this.state.points}</Text></Text>
          </View>
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

        {/* QR Overlay */}
        { (steps[stepIndex].type === 'QRStep' && this.state.displayCamera) &&
          <View style={styles.overlay}> 
            <QRScanScreen checkQr={this.checkQr.bind(this)} /> 
            <AnnotatedButton 
              onPress={() => this.setState({ displayCamera: false })} 
              icon='flag' buttonText="View Step Description" 
            />
          </View>
        }

        {/* Overlay -> display hint */}
        { this.state.displayHintOverlay &&
          <TouchableWithoutFeedback onPress={() => this.setState({ displayHintOverlay: false })} accessible={false}>
            <View style={styles.overlay}> 
              <Text style={styles.h1}> {steps[stepIndex].stepHint} </Text>
              <Feather name='alert-circle' size={60} color={Colors.lightSecondary} />
            </View>
          </TouchableWithoutFeedback>
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
    minWidth: 180,
  },
  gameCardElement: {
    backgroundColor: Colors.lightSecondary,
    padding: 8,
    margin: 3,    
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
  score: { 
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
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
