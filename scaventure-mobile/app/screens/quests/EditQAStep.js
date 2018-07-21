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
import { editStep } from '../../actions/questActions';
import { Feather } from '@expo/vector-icons';
import MapButton from '../common/MapButton';
import AnnotatedButton from '../common/AnnotatedButton';



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
  mapIconDiv : {
    width: '30%',
    padding:5,
    
  }


});



class EditQAStep extends React.Component {
  constructor(props){
    super(props)
    const { step } = this.props.navigation.state.params;
    var p = (step.points).toString();
    this.state={
      initialPosition: {
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0,
      },

      question: step.question,
      option1: step.options[0],
      option2: step.options[1],
      option3: step.options[2],
      option4: step.options[3],
      item1: step.item1,
      item2: step.item2,
      item3: step.item3,
      item4: step.item4,
      points: p,
      hint: step.stepHint,
      addingFeedback: false,
      errors: { hint: null, points: null , question: null, option1: null, option2: null, option3: null, option4: null,item1: null, item2: null, item3: null, item4: null },
    }


  }

validateField(fieldname) {
    const value = this.state[fieldname];
    let error = '';

    if (fieldname === 'question') {
      error = (!value || value.trim() === '') ? 'question cannot be empty!' : null;
    } else if (fieldname === 'item1' || fieldname === 'item2' || fieldname === 'item3' || fieldname === 'item4') {
      error = (!value || value.trim() === '') ? 'You must select an answer to this question!' : null;
    }else if(fieldname === 'option1' || fieldname === 'option2'  ||fieldname === 'option3'  ||fieldname === 'option4' ){
      error = (!value || value.trim() === '') ? 'You must provide an option in all fields!' : null;

    }

    return error;
  }

  checkPoint() {
    const error = this.validateField('points');
    this.setState({ errors: { question: error, points: this.state.errors.points } }); 
  }

  checkHint() {
    const error = this.validateField('hint');
    this.setState({ errors: { question: error, hint: this.state.errors.hint } }); 
  }
  checkQuestion() {
    const error = this.validateField('question');
    this.setState({ errors: { question: error, option1: this.state.errors.option1 } }); 
  }

  CheckOption1() {
    const error = this.validateField('option1');
    this.setState({ errors: { question: this.state.errors.title, 
                              item1: this.state.errors.item1,
                              item2: this.state.errors.item2,
                              item3: this.state.errors.item3,
                              item4: this.state.errors.item4,
                              option2: this.state.errors.title,
                              option3: this.state.errors.title,
                              option4: this.state.errors.title,
                              option1: error } });  
  }

  CheckOption2() {
    const error = this.validateField('option1');
    this.setState({ errors: { question: this.state.errors.title, 
                              item1: this.state.errors.item1,
                              item2: this.state.errors.item2,
                              item3: this.state.errors.item3,
                              item4: this.state.errors.item4,
                              option1: this.state.errors.option1,
                              option3: this.state.errors.option3,
                              option4: this.state.errors.option4,
                              option2: error } });  
  }

  CheckOption3() {
    const error = this.validateField('option1');
    this.setState({ errors: { question: this.state.errors.title, 
                              item1: this.state.errors.item1,
                              item2: this.state.errors.item2,
                              item3: this.state.errors.item3,
                              item4: this.state.errors.item4,
                              option1: this.state.errors.option1,
                              option2: this.state.errors.option2,
                              option4: this.state.errors.option4,
                              option3: error } });  
  }

  CheckOption4() {
    const error = this.validateField('option1');
    this.setState({ errors: { question: this.state.errors.title, 
                              item1: this.state.errors.item1,
                              item2: this.state.errors.item2,
                              item3: this.state.errors.item3,
                              item4: this.state.errors.item4,
                              option1: this.state.errors.option1,
                              option2: this.state.errors.option2,
                              option3: this.state.errors.option4,
                              option4: error } });  
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
        var initialRegion = {
            latitude: step.stepLocation.coordinates[1],
            longitude: step.stepLocation.coordinates[0],
            latitudeDelta: 0.09,
            longitudeDelta: 0.09,
          }         
        this.setState({
            question: step.question,
            option1: step.options[0],
            option2: step.options[1],
            option3: step.options[2],
            option4: step.options[3],
            item1: step.item1,
            item2: step.item2,
            item3: step.item3,
            item4: step.item4,
            points: p,
            hint: step.stepHint,
            initialPosition: initialRegion,
            markerPosition: initialRegion
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
      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
      
    }, (error)=> alert(JSON.stringify(error)),
    {enableHighAccuracy: false, timeout: 20000, maximumAge:1000})

    this.watchID 
    
    
  }*/

  
  
  
  onSelect(index, value){
    this.setState({
      index
      
    })
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
    const { step } = this.props.navigation.state.params;

    const errorTitle = this.validateField('question');
    const errOption1 = this.validateField('option1');
    const errOption2 = this.validateField('option2');
    const errOption3 = this.validateField('option3');
    const errOption4 = this.validateField('option4');

    

    if (errorTitle || errOption1 ||errOption2 || errOption3 || errOption4  || !this.state.question || !this.state.option1 || !this.state.option2 || !this.state.option3 || !this.state.option4|| !this.state.points) {
      this.setState({ errors: { title: errorTitle, description: errOption1 } });
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
      options: [this.state.option1, this.state.option2, this.state.option3, this.state.option4],
      answer: this.state.index,
      points: this.state.points,
      stepHint: this.state.hint,
    };

    this.props.editStep(step._id, step.questId, data).then(() => {
      console.log("Edit Quest from no lat");
      this.props.navigation.goBack();
    });
  }

  render() {
    const { step } = this.props.navigation.state.params;
    let { question } = this.state;
    let { option1 } = this.state;
    let { option2 } = this.state; 
    let { option3 } = this.state;     
    let { option4 } = this.state; 
    let { hint } = this.state;
    let { points } = this.state;  
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
        <RadioGroup
        onSelect = {(index, value) => this.onSelect(index, value)}>
        
        <RadioButton value={'item1'} >
        <TextInput
            underlineColorAndroid='transparent'
            style={styles.textIpt}
            value={option1}
            //placeholder='Option 1'
            onChangeText={(option1) => this.setState({ option1 })}
            error={this.state.errors.option1}
            onBlur={() => this.CheckOption1()}
          />
        </RadioButton>
 
        <RadioButton value={'item2'}>
        <TextInput
            underlineColorAndroid='transparent'
            style={styles.textIpt}
            value={option2}
            //placeholder='Option 2'
            onChangeText={(option2) => this.setState({ option2 })}
            error={this.state.errors.option2}
            onBlur={() => this.CheckOption2()}
          />
        </RadioButton>
 
        <RadioButton value={'item3'}>
        <TextInput
            underlineColorAndroid='transparent'
            style={styles.textIpt}
            value={option3}
            //placeholder='Option 3'
            onChangeText={(option3) => this.setState({ option3 })}
            error={this.state.errors.option3}
            onBlur={() => this.CheckOption3()}
          />
        </RadioButton>
        <RadioButton value={'item4'}>
        <TextInput
            underlineColorAndroid='transparent'
            style={styles.textIpt}
            value={option4}
            //placeholder='Option 4'
            onChangeText={(option4) => this.setState({ option4 })}
            error={this.state.errors.option4}
            onBlur={() => this.CheckOption4()}
          />
        </RadioButton>
      </RadioGroup>
      
      <TextField
          label='Hint'
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          value={hint}
          onChangeText={(hint)=> this.setState({hint})}
          error={this.state.errors.hint}
          onBlur={() => this.checkHint()}
        />

      <TextField
          label='Points'
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          value={points}
          onChangeText={(points)=> this.setState({points})}
          error={this.state.errors.points}
          onBlur={() => this.CheckOption4()}
        />
      </View> 
      
      {/* Button to open-up a map */}
      <View  style={{ flexDirection: 'row' }} >
      <View style={styles.mapIconDiv}>
          
          <MapButton 
                text={'Step Start Location'}
                onPress={this.openMap.bind(this)}
              />   
          <Text style={{textAlign: 'center'}}>Step Start Location</Text>
      </View>
      
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
          <AnnotatedButton 
          color={Colors.green}
          onPress={this.closeMap.bind(this)} 
          icon='check' 
          buttonText="Done!" 
        /> 
          </View>
        }

      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editStep }, dispatch);
}

export default connect(null, mapDispatchToProps)(EditQAStep);
