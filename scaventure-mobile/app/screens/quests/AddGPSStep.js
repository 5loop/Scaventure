import React from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Colors from '../../constants/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box'
import { Container, Content, List, ListItem, Radio } from 'native-base';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import { width, height, totalSize } from 'react-native-dimension';
import MapView from 'react-native-maps';
import { addStep, addHint } from '../../actions/questActions';
import { Feather } from '@expo/vector-icons';




const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width/height
const LATTITUDE_DELTA = 0.03
const LONGTITUDE_DELTA = 0.03


const styles = StyleSheet.create({
  container: {
    flex: 1,                           
    backgroundColor: Colors.white,          
    padding: 18,
  },
  button: {
    height: 38,
    borderRadius: 18,
    backgroundColor: Colors.tertiaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
  },

  inputStyle: {
    fontSize: 20,
    width: '90%',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor:'#C0C0C0',
  },

  inputLable: {
    fontSize: 20,
    fontWeight: '300',
  },
  textIpt: {
    marginLeft: 7.5,
    fontSize: 12,
    height: 25,
    width: 185,
    
    
    
  },
  map: {
    minWidth: 300, 
    minHeight: 500 ,
    flex:1,
    flexDirection: 'column',
    
  },
  maps:{
    flex:1,
    
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



class AddGPSStep extends React.Component {
  constructor(props){
    super(props)

    this.state={
      initialPosition: {
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0,
      },

      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      item1: '',
      item2: '',
      item3: '',
      item4: '',
      Points: 0,
      hint: '',
      addingFeedback: false,
      errors: { hint: null, Points: null , question: null, },
    }


  }

validateField(fieldname) {
    const value = this.state[fieldname];
    let error = '';

    if (fieldname === 'question') {
      error = (!value || value.trim() === '') ? 'question cannot be empty!' : null;
    } else if (fieldname === 'Points') {
      error = (!value || value.trim() === '') ? 'You must select an answer to this question!' : null;
    }else if(fieldname === 'hint' ){
      error = (!value || value.trim() === '') ? 'You must provide an option in all fields!' : null;

    }

    return error;
  }

  checkPoint() {
    const error = this.validateField('Points');
    this.setState({ errors: { Points: error, question: this.state.errors.question } }); 
  }

  checkHint() {
    const error = this.validateField('hint');
    this.setState({ errors: { hint: error, Points: this.state.errors.Points } }); 
  }
  checkQuestion() {
    const error = this.validateField('question');
    this.setState({ errors: { question: error, hint: this.state.errors.hint } }); 
  }





  

  componentDidMount(){
    
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      }
      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
      
    }, (error)=> alert(JSON.stringify(error)),
    {enableHighAccuracy: false, timeout: 20000, maximumAge:1000})

    this.watchID 
    
    
  }

  

    // Map Overlay - close
    closeMap() {
      this.setState({ displayMap: false });
    }
  
    // Map Overlay - open
    openMap() {
      this.setState({ displayMap: true });
    }

  onPress() {
    const { quest } = this.props.navigation.state.params;

    const errorTitle = this.validateField('question');
    const errorHint = this.validateField('hint');
    const errPoints = this.validateField('Points');

    if (errorTitle || errorHint ||errPoints || !this.state.question || !this.state.Points || !this.state.hint ) {
      this.setState({ errors: { title: errorTitle, description: errorTitle } });
      Alert.alert('Alert', 'Please Fill in all the required fields!');
      return;
    }

    this.setState({ addingFeedback: true });
    let startLocation = [];
    let stepLocation = []; // must be separate from start location

    if (this.state.x === undefined) {
      startLocation = [this.state.initialPosition.longitude, this.state.initialPosition.latitude];
    } else {
      startLocation = [this.state.x.longitude, this.state.x.latitude];
    }

    stepLocation = startLocation; // TODO: remove 

    const data = {
      question: this.state.question,
      startLocation: {
        type: 'Point',
        coordinates: startLocation,
      },
      stepLocation: {
        type: 'Point',
        coordinates: stepLocation,
      },
      description: this.state.question,
      points: 10, // TODO: get from state
      stepHint: this.state.hint,
    };

    this.props.addStep('gps', quest._id, data).then(() => {
      console.log("Add Quest from no lat");
      this.props.navigation.goBack();
    });
}

  render() {    
    return (
      <View style={styles.container}>
            
        <View>
            <TextField
            label='Question'
            baseColor={Colors.secondaryColor}
            tintColor={Colors.primaryColor}
            onChangeText={(question)=> this.setState({question})}
            error={this.state.errors.question}
            onBlur={() => this.checkQuestion()}
            />

            <TextField
            label='Hint'
            baseColor={Colors.secondaryColor}
            tintColor={Colors.primaryColor}
            onChangeText={(hint)=> this.setState({hint})}
            error={this.state.errors.hint}
            onBlur={() => this.checkHint()}
            />

            <TextField
            label='Points'
            baseColor={Colors.secondaryColor}
            tintColor={Colors.primaryColor}
            onChangeText={(Points)=> this.setState({Points})}
            error={this.state.errors.Points}
            onBlur={() => this.checkPoint()}
            />

        </View>
         
      
      {/* Button to open-up a map */}       
      <View>
          <Text style={styles.h1}>Map</Text>
          <TouchableHighlight onPress={this.openMap.bind(this)}>
            <Feather name="map-pin" size={35} color={Colors.black} />
          </TouchableHighlight>
      </View>
      
      
      <View>
        <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText} onPress={this.onPress.bind(this)}>Add New</Text>
          </TouchableHighlight>
      </View>
      

        {/* Map Overlay */}
        { this.state.displayMap &&
          <View style={styles.overlay}> 
            <MapView
            closeMap={this.closeMap.bind(this)}
            style={styles.map}
            region={this.state.initialPosition}
            
            initialRegion = {this.state.initialPosition}
            >
            <MapView.Marker draggable
              
              coordinate={this.state.initialPosition}
              
              onDragEnd={(e) => {
                
                this.setState({ x: e.nativeEvent.coordinate})
                  }
              }
              region={this.state.coordinate}
            
              
            />

          </MapView>
          <TouchableHighlight> 
            <Text style={styles.buttonText} onPress={this.closeMap.bind(this)}>Close Map</Text> 
            </TouchableHighlight> 
          </View>
        }

      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addStep, addHint }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddGPSStep);
