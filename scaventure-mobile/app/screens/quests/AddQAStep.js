import React from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableHighlight } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Colors from '../../constants/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box'
import { Container, Content, List, ListItem, Radio } from 'native-base';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import { width, height, totalSize } from 'react-native-dimension';
import MapView from 'react-native-maps';
import { addStep } from '../../actions/questActions';



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
    margin: 48,
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
    left:4,
    right:0,
    flex:1,
    flexDirection: 'column',
    
  },
  maps:{
    flex:1,
    
  }



});



class AddQAStep extends React.Component {
  constructor(props){
    super(props)

    this.state={
      initialPosition: {
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0,
      }
    }
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

  
  
  onSelect(index, value){
    this.setState({
      index
      
    })
  }

  onPress(){
    const { quest } = this.props.navigation.state.params;

    if(this.state.x == undefined) {
      console.log(this.state.value);
      const data = {
        question: this.state.question,
        startLocation: {
          type: "Point",
          coordinates: [this.state.initialPosition.latitude, this.state.initialPosition.longitude]
        
        },
        stepLocation: {
          type: "Point",
          coordinates: [this.state.initialPosition.latitude, this.state.initialPosition.longitude]
        
        },
          stepNumber: 1,
          description: this.state.question,
          options: [this.state.option1, this.state.option2, this.state.option3, this.state.option4],
          answer: this.state.index,
          points: 10,
      }
      this.props.addStep('qa', quest._id, data).then(() => {
        console.log("Add Quest from no lat");
        this.props.navigation.goBack();

      })

    }else{
      const data = {
        question: this.state.question,
        startLocation: {
          type: "Point",
          coordinates: [this.state.x.latitude, this.state.x.longitude]
        
        },
        stepLocation: {
          type: "Point",
          coordinates: [this.state.x.latitude, this.state.x.longitude]
        
        },
          stepNumber: 1,
          description: this.state.question,
          options: [this.state.option1, this.state.option2, this.state.option3, this.state.option4],
          answer: this.state.index,
          points: 10,
      }
      this.props.addStep('qa', quest._id, data).then(() => {
        console.log("Add Quest from no lat");
        this.props.navigation.goBack();

      })
    }

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
        />
        <RadioGroup
        onSelect = {(index, value) => this.onSelect(index, value)}>
        
        <RadioButton value={'item1'} >
        <TextInput
            underlineColorAndroid='transparent'
            style={styles.textIpt}
            placeholder='Option 1'
            onChangeText={(option1) => this.setState({ option1 })}
          />
        </RadioButton>
 
        <RadioButton value={'item2'}>
        <TextInput
            underlineColorAndroid='transparent'
            style={styles.textIpt}
            placeholder='Option 2'
            onChangeText={(option2) => this.setState({ option2 })}
          />
        </RadioButton>
 
        <RadioButton value={'item3'}>
        <TextInput
            underlineColorAndroid='transparent'
            style={styles.textIpt}
            placeholder='Option 3'
            onChangeText={(option3) => this.setState({ option3 })}
          />
        </RadioButton>
        <RadioButton value={'item4'}>
        <TextInput
            underlineColorAndroid='transparent'
            style={styles.textIpt}
            placeholder='Option 4'
            onChangeText={(option4) => this.setState({ option4 })}
          />
        </RadioButton>
      </RadioGroup>

      <TextField
          label='Points'
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          onChangeText={(Points)=> this.setState({Points})}
        />
      </View> 
      <MapView
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

      <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText} onPress={this.onPress.bind(this)}>Add New</Text>
        </TouchableHighlight>
      
      
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addStep }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddQAStep);
