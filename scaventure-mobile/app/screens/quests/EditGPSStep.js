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
import { editStep, addHint } from '../../actions/questActions';
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



class EditGPSStep extends React.Component {
  constructor(props){
    super(props)
    const { step } = this.props.navigation.state.params;
    var p = (step.points).toString();
    var r = (step.radius).toString();
    this.state={
      initialPosition: {
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0,
      },
      initialPosition2: {
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0,
      },

      question: step.description,      
      points: p,
      hint: step.stepHint,
      radius: r,
      addingFeedback: false,
      errors: { hint: null, points: null , question: null, },
    }


  }

validateField(fieldname) {
    const value = this.state[fieldname];
    let error = '';

    if (fieldname === 'question') {
      error = (!value || value.trim() === '') ? 'question cannot be empty!' : null;
    } else if (fieldname === 'points') {
      error = (!value || value.trim() === '') ? 'You must select an answer to this question!' : null;
    }else if(fieldname === 'hint' ){
      error = (!value || value.trim() === '') ? 'You must provide an option in all fields!' : null;

    }

    return error;
  }

  checkPoint() {
    const error = this.validateField('points');
    this.setState({ errors: { points: error, question: this.state.errors.question } }); 
  }

  checkHint() {
    const error = this.validateField('hint');
    this.setState({ errors: { hint: error, points: this.state.errors.points } }); 
  }
  checkQuestion() {
    const error = this.validateField('question');
    this.setState({ errors: { question: error, hint: this.state.errors.hint } }); 
  }

  componentWillMount(){
    const { step } = this.props.navigation.state.params;
      if(step)
      this.setDefaultState(step);
  }

  componentWillReceiveProps(nextProps){
    this.setDefaultState(nextProps);
}

    setDefaultState(step){
        var p = (step.points).toString();
        var r = (step.radius).toString();
        var initialRegion = {
            latitude: step.startLocation.coordinates[1],
            longitude: step.startLocation.coordinates[0],
            latitudeDelta: 0.09,
            longitudeDelta: 0.09,
          }
        var initialRegion2 = {
          latitude: step.stepLocation.coordinates[1],
          longitude: step.stepLocation.coordinates[0],
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }           
        this.setState({
            question: step.description,            
            hint: step.stepHint,            
            points: p,
            radius: r,
            initialPosition: initialRegion,
            markerPosition: initialRegion,
            initialPosition2: initialRegion2,
            markerPosition2: initialRegion
        })
    }



  

  /*componentDidMount(){
    
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      }

      var initialRegion2 = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      }
      

      
      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})

      this.setState({initialPosition2: initialRegion2})
      this.setState({markerPosition2: initialRegion})
      
    }, (error)=> alert(JSON.stringify(error)),
    {enableHighAccuracy: false, timeout: 20000, maximumAge:1000})

    this.watchID 
    
    
  }*/

  

    // Map Overlay - close
    closeMap() {
      this.setState({ displayMap: false });
    }
  
    // Map Overlay - open
    openMap() {
      this.setState({ displayMap: true });
    }

        // Map Overlay - close
        closeMap2() {
          this.setState({ displayMap2: false });
        }
      
        // Map Overlay - open
        openMap2() {
          this.setState({ displayMap2: true });
        }
        
  onPress() {
    const { step } = this.props.navigation.state.params;

    const errorTitle = this.validateField('question');
    const errorHint = this.validateField('hint');
    const errPoints = this.validateField('points');

    if (errorTitle || errorHint ||errPoints || !this.state.question || !this.state.points || !this.state.hint ) {
      this.setState({ errors: { title: errorTitle, description: errorTitle } });
      Alert.alert('Alert', 'Please Fill in all the required fields!');
      return;
    }

    this.setState({ addingFeedback: true });
    let startLocation = [];
    let stepLocation = []; // must be separate from start location

    if (this.state.x === undefined) {
      console.log("i am adding start");
      startLocation = [this.state.initialPosition.longitude, this.state.initialPosition.latitude];
    } else {
      console.log("i am in else adding start");
      startLocation = [this.state.x.longitude, this.state.x.latitude];
    }

    if(this.state.y === undefined){
      console.log("i am adding step");
      stepLocation = [this.state.initialPosition2.longitude, this.state.initialPosition2.latitude];
    } else {
      console.log("i am in else adding step");
      stepLocation = [this.state.y.longitude, this.state.y.latitude];
    }

    //stepLocation = startLocation; // TODO: remove 

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
      points: this.state.points, // TODO: get from state
      stepHint: this.state.hint,
      radius: this.state.radius,
    };

    this.props.editStep(step._id, step.questId, data).then(() => {
      console.log("Add Quest from no lat");
      this.props.navigation.goBack();
    });
}

  render() {
    const { step } = this.props.navigation.state.params;
    let { question } = this.state;
    let { hint } = this.state;
    let { points } = this.state;
    let { radius } = this.state;   
    return (
      <View style={styles.container}>
            
        <View>
            <TextField
            label='Question'
            value={question}
            baseColor={Colors.secondaryColor}
            tintColor={Colors.primaryColor}
            onChangeText={(question)=> this.setState({question})}
            error={this.state.errors.question}
            onBlur={() => this.checkQuestion()}
            />

            <TextField
            label='Hint'
            value={hint}
            baseColor={Colors.secondaryColor}
            tintColor={Colors.primaryColor}
            onChangeText={(hint)=> this.setState({hint})}
            error={this.state.errors.hint}
            onBlur={() => this.checkHint()}
            />

            <TextField
            label='Points'
            value={points}
            baseColor={Colors.secondaryColor}
            tintColor={Colors.primaryColor}
            onChangeText={(points)=> this.setState({points})}
            error={this.state.errors.points}
            onBlur={() => this.checkPoint()}
            />

            <TextField
            label='Radius(m)'
            value={radius}
            baseColor={Colors.secondaryColor}
            tintColor={Colors.primaryColor}
            onChangeText={(radius)=> this.setState({radius})}
            error={this.state.errors.points}
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
          <Text style={styles.h1}>Map</Text>
          <TouchableHighlight onPress={this.openMap2.bind(this)}>
            <Feather name="map-pin" size={35} color={Colors.black} />
          </TouchableHighlight>
      </View>
      
      <View>
        <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText} onPress={this.onPress.bind(this)}>Save</Text>
          </TouchableHighlight>
      </View>
      

        {/* Map Overlay */}
        { this.state.displayMap &&
          <View style={styles.overlay}> 
            <MapView
            closeMap={this.closeMap.bind(this)}
            style={styles.map}
            //initialRegion = {this.state.initialPosition}
            region={{latitude: this.state.initialPosition.latitude,
              longitude: this.state.initialPosition.longitude,
              latitudeDelta: this.state.initialPosition.latitudeDelta,
              longitudeDelta: this.state.initialPosition.longitudeDelta}}
            
            
            initialRegion = {{latitude: this.state.initialPosition.latitude,
              longitude: this.state.initialPosition.longitude,
              latitudeDelta: this.state.initialPosition.latitudeDelta,
              longitudeDelta: this.state.initialPosition.longitudeDelta}}
            //onRegionChange={this.state.coordinate}
            >
            <MapView.Marker draggable
              
              coordinate={this.state.initialPosition}
              
              onDragEnd={(e) => {
                
                  coordinate: {this.state.x}
                
                this.setState({ x: e.nativeEvent.coordinate, initialPosition: e.nativeEvent.coordinate})
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
        
        { this.state.displayMap2 &&
          <View style={styles.overlay}> 
            <MapView
            closeMap={this.closeMap2.bind(this)}
            style={styles.map}
            region={{latitude: this.state.initialPosition2.latitude,
              longitude: this.state.initialPosition2.longitude,
              latitudeDelta: this.state.initialPosition2.latitudeDelta,
              longitudeDelta: this.state.initialPosition2.longitudeDelta}}
            
            initialRegion = {{latitude: this.state.initialPosition2.latitude,
              longitude: this.state.initialPosition2.longitude,
              latitudeDelta: this.state.initialPosition2.latitudeDelta,
              longitudeDelta: this.state.initialPosition2.longitudeDelta}}
            
            //initialRegion = {this.state.initialPosition2}
            >
            <MapView.Marker draggable
              
              coordinate={this.state.initialPosition2}
              
              onDragEnd={(e) => {
                
                this.setState({ y: e.nativeEvent.coordinate, initialPosition2: e.nativeEvent.coordinate})
                  }
              }
              region={this.state.coordinate}
             
            
              
            />
            
          </MapView>
          <TouchableHighlight> 
            <Text style={styles.buttonText} onPress={this.closeMap2.bind(this)}>Close Map</Text> 
            </TouchableHighlight> 
          </View>

          
        }

      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editStep, addHint }, dispatch);
}

export default connect(null, mapDispatchToProps)(EditGPSStep);
