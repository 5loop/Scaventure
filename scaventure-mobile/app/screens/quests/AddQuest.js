import React from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableHighlight } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import MapView from 'react-native-maps';
import { TextField } from 'react-native-material-textfield';
import Colors from '../../constants/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addQuest } from '../../actions/questActions';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { Label } from 'native-base';
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

  contentRow: {
    flex:1,
    flexDirection:'row',
    marginBottom: 5,
    flexWrap: 'wrap',
    height:'20%',
    padding:5,

  },
  ip:{
    
    padding: 5,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor:'#C0C0C0',
    backgroundColor:'rgba(61,63,111,0.3)',
    marginBottom:10,
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

  radioButtons: {
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#C0C0C0',
    marginBottom: 5,
    height:'40%',
    padding:5,
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
    
  },
});

  
class AddQuest extends React.Component {

  constructor(props){
    super(props)

    this.state={
      initialPosition: {
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0,
      },
      title: '',
      description: '',
      addingFeedback: false,
      errors: { title: null, description: null },
      
    }
  }

  onFocusTitle() {
    this.setState({ errors: { title: null, description: this.state.errors.description } }); 
  }

  onFocusDescription() {
    this.setState({ errors: { title: this.state.errors.title, description: null } }); 
  }

  updateStars(i) {
    this.setState({ numStars: i + 1 });
  }

  validateField(fieldname) {
    const value = this.state[fieldname];
    let error = '';

    if (fieldname === 'title') {
      error = (!value || value.trim() === '') ? 'Title cannot be empty!' : null;
    } else if (fieldname === 'description') {
      error = (!value || value.trim() === '') ? 'Description cannot be empty!' : null;
    }

    return error;
  }

  checkTitle() {
    const error = this.validateField('title');
    this.setState({ errors: { title: error, description: this.state.errors.description } }); 
  }

  checkDescription() {
    const error = this.validateField('description');
    this.setState({ errors: { title: this.state.errors.title, description: error } });  
  }
  // Map Overlay - close
  closeMap() {
    this.setState({ displayMap: false });
  }

  // Map Overlay - open
  openMap() {
    this.setState({ displayMap: true });
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
      value
      
    })
  }


  onPress(){
    console.log(this.state.x);
    
    const errorTitle = this.validateField('title');
    const errorDescription = this.validateField('description');

    if (errorTitle || errorDescription || !this.state.title || !this.state.description) {
      this.setState({ errors: { title: errorTitle, description: errorDescription } });
      return;
    }

    this.setState({ addingFeedback: true });

    
    if(this.state.x == undefined) {
      
      

      const data = {
        title: this.state.title,
        description: this.state.description,
        type: this.state.value,
        loc: {
          type: "Point",
          coordinates: [this.state.initialPosition.longitude, this.state.initialPosition.latitude]
        }
      }
      this.props.addQuest(data).then(() => {
        console.log(this.props.newQuest);
        this.props.navigation.navigate('QuestStepList', {quest: this.props.newQuest});
      })


    }else{
      console.log("in the else");

      const data = {
        title: this.state.title,
        description: this.state.description,
        type: this.state.value,
        loc: {
          type: "Point",
          coordinates: [this.state.x.longitude, this.state.x.latitude]
        }
      }
      this.props.addQuest(data).then(() => {
        console.log(this.props.newQuest);

        this.props.navigation.navigate('QuestStepList', {quest: this.props.newQuest});
      })

      
  }

  }
 
 
  render() {
    
    
    return ( 
      <View style={styles.container}>
        
          <View>
          <TextField
          label='Title'
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          onChangeText={(title)=> this.setState({title})}
          error={this.state.errors.title}
          onBlur={() => this.checkTitle()}
          onFocus={() => this.onFocusTitle()}
          characterRestriction={40}
          maxLength={40}
          
        />
        <TextField
          label='Description'
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          multiline
          onChangeText={(description)=> this.setState({description})}
          error={this.state.errors.description}
          onBlur={() => this.checkDescription()}
          onFocus={() => this.onFocusDescription()}
          characterRestriction={300}
          maxLength={300}

        />

        <RadioGroup
        onSelect = {(index, value) => this.onSelect(index, value)} >

        
          <RadioButton value={'public'} >
            <Text>Public</Text>
          </RadioButton>
          <RadioButton value={'private'} >
            <Text>Private</Text>
          </RadioButton>
        
        </RadioGroup>

          </View>
          {/* Button to open-up a map */}       
    
    <View  style={{ flexDirection: 'row' }} >
      <View style={styles.mapIconDiv}>
          
          <MapButton 
                text={'Step Start Location'}
                onPress={this.openMap.bind(this)}
              />   
          <Text style={{textAlign: 'center'}}>Quest Start Location</Text>
      </View>
      
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
            region={{latitude: this.state.initialPosition.latitude,
              longitude: this.state.initialPosition.longitude,
              latitudeDelta: this.state.initialPosition.latitudeDelta,
              longitudeDelta: this.state.initialPosition.longitudeDelta}}
            
            initialRegion = {{latitude: this.state.initialPosition.latitude,
                longitude: this.state.initialPosition.longitude,
                latitudeDelta: this.state.initialPosition.latitudeDelta,
                longitudeDelta: this.state.initialPosition.longitudeDelta}}
            //initialRegion = {this.state.coordinate}
            //onRegionChange={this.state.coordinate}
            >
            <MapView.Marker draggable
              
              coordinate={this.state.initialPosition}
              region={this.state.coordinate}
              onDragEnd={(e) => {
                
                  //coordinate: {this.state.x}
                
                this.setState({ x: e.nativeEvent.coordinate, initialPosition: e.nativeEvent.coordinate})
                  }
              }
              
            
              
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

function mapStateToProps(state){
  console.log(state)
  return{
    newQuest: state.newQuest.newQuest,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addQuest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuest);
